import {
  requestAccess,
  getAddress
} from "@stellar/freighter-api";
import Albedo from "@albedo-link/intent";

export const detectWallets = async () => {
  return ["freighter"]; // always show
};

export const connectWallet = async (walletType) => {
  if (walletType === "freighter") {
    try {
      await requestAccess();

      const result = await getAddress();

      // Handle both formats
      const address =
        typeof result === "string"
          ? result
          : result?.address;

      if (!address) {
        throw new Error("Could not retrieve public key");
      }

      return {
        type: "freighter",
        publicKey: address
      };

    } catch (err) {
      throw new Error(err.message || "Freighter connection failed");
    }
  }

  if (walletType === "albedo") {
    try {
      const result = await Albedo.publicKey();

      return {
        type: "albedo",
        publicKey: result.pubkey
      };

    } catch (err) {
      throw new Error(err.message || "Albedo connection failed");
    }
  }

  throw new Error("Unsupported wallet");
};