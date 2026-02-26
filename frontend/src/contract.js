import CONFIG from "./config.js";
import { signTransaction } from "@stellar/freighter-api";
import Albedo from "@albedo-link/intent";
import {
  SorobanRpc,
  TransactionBuilder,
  Contract,
  Address,
  nativeToScVal
} from "@stellar/stellar-sdk";

const { CONTRACT_ID, RPC_URL, NETWORK_PASSPHRASE } = CONFIG;

export async function donateTx(publicKey, amount, walletType) {
  if (!publicKey) {
    throw new Error("Wallet not found. Please connect your wallet first.");
  }

  if (!walletType) {
    throw new Error("No wallet selected.");
  }

  const server = new SorobanRpc.Server(RPC_URL);

  // ----------------------------
  // Error 1: Wallet not funded
  // ----------------------------
  let account;
  try {
    account = await server.getAccount(publicKey);
  } catch (err) {
    throw new Error(
      "Wallet not found on testnet. Fund it at: https://friendbot.stellar.org/?addr=" +
        publicKey
    );
  }

  const contract = new Contract(CONTRACT_ID);
  const amountInStroops = BigInt(
    Math.floor(Number(amount) * 10_000_000)
  );

  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: NETWORK_PASSPHRASE
  })
    .addOperation(
      contract.call(
        "donate",
        new Address(publicKey).toScVal(),
        nativeToScVal(amountInStroops, { type: "i128" })
      )
    )
    .setTimeout(30)
    .build();

  // ----------------------------
  // Simulation
  // ----------------------------
  let simResult;
  try {
    simResult = await server.simulateTransaction(tx);
  } catch (err) {
    throw new Error("Simulation error: " + err.message);
  }

  // ----------------------------
  // Error 2: Insufficient balance
  // ----------------------------
  if (simResult.error) {
    const msg = simResult.error.toLowerCase();
    if (msg.includes("insufficient")) {
      throw new Error("Insufficient balance to complete this transaction.");
    }
    throw new Error("Simulation failed: " + simResult.error);
  }

  const preparedTx = SorobanRpc
    .assembleTransaction(tx, simResult)
    .build();

  // ----------------------------
  // SIGN TRANSACTION
  // ----------------------------
  let signedXdr;

  try {
    // 🔹 FREIGHTER
    if (walletType === "freighter") {
      const signResult = await signTransaction(
        preparedTx.toXDR(),
        { networkPassphrase: NETWORK_PASSPHRASE }
      );

      if (typeof signResult === "string") {
        signedXdr = signResult;
      } else if (signResult?.signedTxXdr) {
        signedXdr = signResult.signedTxXdr;
      } else {
        signedXdr = signResult;
      }
    }

    // 🔹 ALBEDO
    else if (walletType === "albedo") {
      const result = await Albedo.tx({
        xdr: preparedTx.toXDR(),
        network: "testnet"
      });

      signedXdr = result.xdr;
    }

    else {
      throw new Error("Unsupported wallet selected.");
    }

  } catch (err) {
    const msg = (err.message || "").toLowerCase();

    if (
      msg.includes("declined") ||
      msg.includes("rejected") ||
      msg.includes("denied")
    ) {
      throw new Error("Transaction rejected by user.");
    }

    throw new Error("Failed to sign: " + err.message);
  }

  // ----------------------------
  // SEND TRANSACTION
  // ----------------------------
  let sendResult;

  try {
    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "sendTransaction",
        params: { transaction: signedXdr }
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    sendResult = data.result;

  } catch (err) {
    throw new Error("Failed to send: " + err.message);
  }

  if (sendResult.status === "ERROR") {
    throw new Error("Transaction failed on network.");
  }

  const hash = sendResult.hash;

  // ----------------------------
  // POLL FOR CONFIRMATION
  // ----------------------------
  for (let i = 0; i < 10; i++) {
    await new Promise((res) => setTimeout(res, 2000));

    try {
      const response = await fetch(RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getTransaction",
          params: { hash }
        })
      });

      const data = await response.json();
      const result = data.result;

      if (result.status === "SUCCESS") {
        return { success: true, hash };
      }

      if (result.status === "FAILED") {
        throw new Error("Transaction failed. Hash: " + hash);
      }

    } catch (err) {
      if (err.message.includes("Transaction failed")) {
        throw err;
      }
      continue;
    }
  }

  throw new Error("Transaction timed out. Hash: " + hash);
}