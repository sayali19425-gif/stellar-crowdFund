🚀 Stellar CrowdFund
Collect Donations with Real-Time Progress Tracking

A decentralized crowdfunding application built on Stellar Soroban Smart Contracts with multi-wallet integration and real-time blockchain event synchronization.

This project was built as part of White Belt Level 2 and demonstrates full smart contract deployment, wallet connection, and live transaction tracking on Stellar Testnet.

📌 Overview

Stellar CrowdFund enables users to:

Connect using multiple Stellar wallets

Donate to a crowdfunding campaign

View real-time funding progress

Track transaction status (Pending / Success / Failed)

Interact directly with a deployed Soroban smart contract

Focus areas of this project:

Multi-wallet integration

Smart contract deployment to Testnet

Calling contract functions from frontend

Reading and writing contract state

Real-time event listening

Transaction lifecycle tracking

Error handling


🛠 Tech Stack
Smart Contract

Rust

Soroban SDK

Stellar Testnet

Frontend

React (Vite)

StellarWalletsKit

Stellar SDK

JavaScript

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

🔥 Features Implemented (Level 2 Requirements)
✅ Multi-Wallet Integration

Using StellarWalletsKit, users can connect via:

Freighter

Albedo

xBull

Wallet detection and connection status handled properly.

✅ Smart Contract Deployment

Contract deployed to Stellar Testnet

Frontend connected to deployed contract

Contract functions invoked from UI

Contract ID:

CBJ52HW7A42KUD3XP42VB35CSJ43QHLNQMPAC4PRF3WMLJVYCDDOGHUV
✅ Contract Interaction from Frontend

The frontend:

Calls the donate() function

Reads contract state

Updates funding progress dynamically

✅ Real-Time Event Handling

Event listener implemented

UI automatically syncs after donation

State reflects latest blockchain data

✅ Transaction Status Tracking

Each donation shows:

⏳ Pending

✅ Success

❌ Failed

Real Transaction Example:

Transaction Hash:

74017d6f00df0bc409f49b8abaecdcc7bc65094587d30c132f1a6b8466b84bc3

Verify on Stellar Explorer (Testnet):
https://stellar.expert/explorer/testnet/tx/74017d6f00df0bc409f49b8abaecdcc7bc65094587d30c132f1a6b8466b84bc3

⚠️ Error Handling (Required 3 Types)

The application handles:

Wallet not found

Transaction rejected by user

Insufficient balance

Clear user feedback is shown for each case.

💻 How to Run the Project
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/stellar-crowdfund.git
cd stellar-crowdfund
2️⃣ Run Frontend
cd frontend
npm install
npm run dev

App runs at:

http://localhost:5173/
🌍 Live Demo

Currently running locally:

http://localhost:5173/

(You can deploy to Vercel or Netlify for public submission.)

📸 Screenshots
Wallet Selection

(Add screenshot here in GitHub)

![Wallet Connected](./screenshots/wallet-<img width="1909" height="850" alt="wallet-connect png" src="https://github.com/user-attachments/assets/f99aa481-9697-4815-94e4-6d525b40ba9b" />
connect.png)
Successful Transaction
![Transaction Success](./screenshots/tx<img width="1891" height="844" alt="tx-success png" src="https://github.com/user-attachments/assets/2630aba4-210d-4e6b-b045-8dab8bedcb8c" />
-success.png)

🧠 What This Project Demonstrates

Deploying Soroban contracts to Testnet

Integrating multiple Stellar wallets

Calling smart contract functions from React frontend

Handling asynchronous blockchain transactions

Listening to contract events

Synchronizing UI state with blockchain

Managing transaction lifecycle

Implementing production-level error handling


📋 Submission Checklist

✅ Public GitHub repository

✅ README with setup instructions

✅ Minimum 2+ meaningful commits

✅ Multi-wallet integration

✅ Contract deployed to testnet

✅ Contract called from frontend

✅ Transaction status visible

✅ Real-time event integration

🔐 Network Details

Network: Stellar Testnet
Contract ID:
CBJ52HW7A42KUD3XP42VB35CSJ43QHLNQMPAC4PRF3WMLJVYCDDOGHUV

👩‍💻 Author

Built to master Soroban smart contracts, wallet integration, and real-time Web3 application development.
