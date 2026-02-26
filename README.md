🚀 Stellar CrowdFund
Soroban Smart Contract + Multi-Wallet Integration

A decentralized crowdfunding dApp built on Stellar Soroban (Testnet) with multi-wallet support and real-time blockchain event synchronization.

This project demonstrates:

Smart contract deployment

Multi-wallet integration

Contract interaction from frontend

Real-time event listening

Transaction lifecycle tracking

Production-level error handling

📂 Project Structure
stellar-fund/
│
├── contract/
│   └── crowdfunding/
│       ├── src/
│       │   ├── lib.rs
│       │   └── test.rs
│       ├── Cargo.toml
│       └── Cargo.lock
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── config.js
│   │   ├── contract.js
│   │   ├── event.js
│   │   ├── wallet.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

🔥 Features
✅ Multi-Wallet Integration

Integrated using StellarWalletsKit:

Freighter

Albedo

xBull

✅ Smart Contract Deployment

Network: Stellar Testnet

Contract ID:CBJ52HW7A42KUD3XP42VB35CSJ43QHLNQMPAC4PRF3WMLJVYCDDOGHUV

✅ Contract Interaction

Frontend can:

Call donate() function

Read total donation amount

Sync state with blockchain

Display transaction status

✅ Transaction Tracking

Transaction Hash Example:

74017d6f00df0bc409f49b8abaecdcc7bc65094587d30c132f1a6b8466b84bc3

Verify on Stellar Expert (Testnet):

https://stellar.expert/explorer/testnet/tx/74017d6f00df0bc409f49b8abaecdcc7bc65094587d30c132f1a6b8466b84bc3

⚠️ Error Handling Implemented

Wallet not found

User rejected transaction

Insufficient balance

💻 Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/stellar-crowdfund.git
cd stellar-crowdfund
2️⃣ Run Frontend
cd frontend
npm install
npm run dev

Runs at:

http://localhost:5173/
📌 Level 2 Requirements Completed

Multi-wallet integration

Contract deployed on Testnet

Contract called from frontend

Real-time event handling

Transaction status tracking

Minimum 2+ commits

🧠 Learning Outcome

This project demonstrates full-cycle Web3 development:

Writing Soroban smart contracts

Deploying to Stellar Testnet

Integrating wallets

Handling async blockchain events

Managing transaction lifecycle

Building production-ready dApps