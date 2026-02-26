import { useEffect, useState } from "react";
import { detectWallets, connectWallet } from "./wallet";
import { donateTx } from "./contract";
import CONFIG from "./config";
import "./styles.css";

const { RPC_URL } = CONFIG;

function App() {
  const [availableWallets, setAvailableWallets] = useState([]);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [publicKey, setPublicKey] = useState("");

  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [liveStatus, setLiveStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // NEW: controls which "page" is shown
  const [page, setPage] = useState("connect"); // "connect" | "connected" | "donate"

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const wallets = await detectWallets();
        setAvailableWallets(wallets);
      } catch (err) {
        console.error("Wallet detection failed:", err);
      }
    };
    loadWallets();
  }, []);

  const handleConnect = async (walletType) => {
    try {
      setStatus("Connecting wallet...");
      const result = await connectWallet(walletType);
      setConnectedWallet(result.type);
      setPublicKey(result.publicKey);
      setStatus("");
      setPage("connected"); // show success screen first
    } catch (err) {
      setStatus("Wallet connection failed: " + err.message);
    }
  };

  const handleDonate = async () => {
    if (!publicKey) { setStatus("Connect wallet first"); return; }
    if (!amount || Number(amount) <= 0) { setStatus("Enter a valid amount"); return; }

    try {
      setLoading(true);
      setTxHash("");
      setLiveStatus("");
      setStatus("Transaction pending...");

      const result = await donateTx(publicKey, amount, connectedWallet);
      setStatus("Transaction submitted!");
      setTxHash(result.hash);
    } catch (err) {
      setStatus(err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!txHash) return;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0", id: 1,
            method: "getTransaction",
            params: { hash: txHash }
          })
        });
        const data = await response.json();
        const result = data.result;
        if (result?.status === "SUCCESS") { setLiveStatus("✅ Transaction Confirmed on-chain"); clearInterval(interval); }
        if (result?.status === "FAILED")  { setLiveStatus("❌ Transaction Failed"); clearInterval(interval); }
      } catch (err) { console.log("Polling error:", err); }
    }, 4000);
    return () => clearInterval(interval);
  }, [txHash]);

  const txLink  = "https://stellar.expert/explorer/testnet/tx/" + txHash;
  const txShort = txHash ? txHash.substring(0, 16) + "..." : "";

  return (
    <div className="container">
      <h1>Stellar Crowdfunding</h1>

      {/* PAGE 1 — Select & connect wallet */}
      {page === "connect" && (
        <div className="card">
          <h3>Select Wallet</h3>
          {availableWallets.length === 0 && <p>No supported wallet detected</p>}
          {availableWallets.map((wallet) => (
            <button key={wallet} onClick={() => handleConnect(wallet)} disabled={loading}>
              Connect {wallet}
            </button>
          ))}
          {status && <p className="status error">{status}</p>}
        </div>
      )}

      {/* PAGE 2 — Wallet connected confirmation */}
      {page === "connected" && (
        <div className="card success-card">
          <div className="success-icon">✅</div>
          <h3>Wallet Connected Successfully!</h3>
          <p className="wallet-label">Connected via <strong>{connectedWallet}</strong></p>
          <div className="account-box">
            <span className="account-label">Account ID</span>
            <span className="account-id">{publicKey}</span>
          </div>
          <button className="proceed-btn" onClick={() => setPage("donate")}>
            Proceed to Donate →
          </button>
        </div>
      )}

      {/* PAGE 3 — Donation form */}
      {page === "donate" && (
        <div className="card">
          <div className="wallet-info">
            <span className="dot connected" />
            <span className="address">{publicKey.substring(0, 10)}...{publicKey.slice(-6)}</span>
            <button className="disconnect-btn" onClick={() => { setPublicKey(""); setConnectedWallet(null); setPage("connect"); setStatus(""); }}>
              Disconnect
            </button>
          </div>

          <h3>Make a Donation</h3>
          <input
            type="number"
            placeholder="Amount in XLM"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
          <button onClick={handleDonate} disabled={loading} className="donate-btn">
            {loading ? "Processing..." : "Donate XLM"}
          </button>

          {status && <p className="status">{status}</p>}
          {liveStatus && <p className="live-status">{liveStatus}</p>}

          {txHash && (
            <div className="tx-hash">
              <span>Tx: </span>
              <a href={txLink} target="_blank" rel="noreferrer">{txShort}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;