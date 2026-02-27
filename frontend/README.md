# 🚀 StellarFund — Decentralized Crowdfunding on Stellar

A fully functional crowdfunding DApp built on **Stellar Soroban** smart contracts with a React frontend. Supports multi-wallet integration, real-time donation tracking, and on-chain transaction status.

---

## 📸 Screenshots

### Wallet Options Available
> The app integrates **4 wallets** via `@creit.tech/stellar-wallets-kit`:

| Wallet | Type | Description |
|--------|------|-------------|
| **Freighter** | Browser Extension | Official SDF wallet |
| **LOBSTR** | Mobile + Browser | Most popular Stellar wallet |
| **xBull** | Browser Extension | Advanced features |
| **Albedo** | Web-based | No install required |

*(Screenshot: Connect Wallet modal shows all four options with icons)*

---

## 📋 Requirements Checklist

### ✅ 3 Error Types Handled

| Error | Trigger | UI Response |
|-------|---------|-------------|
| **Wallet Not Found** | Extension not installed | Toast with install link |
| **Transaction Rejected** | User denies in wallet | Toast with retry option |
| **Insufficient Balance** | XLM balance < donation amount | Toast with fund account link |

See `frontend/src/wallet.js` → `parseWalletError()` for full implementation.

### ✅ Contract Deployed on Testnet

```
Contract Address: CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCN4
Network: Stellar Testnet
Explorer: https://stellar.expert/explorer/testnet/contract/YOUR_CONTRACT_ADDRESS
```

> **Note:** Replace with your actual contract address after deployment. See [Deploy Steps](#deployment) below.

### ✅ Contract Called from Frontend

The frontend calls these contract functions:
- `get_campaign_info` — reads campaign title, goal, raised, deadline
- `donate(donor, amount)` — submits a donation transaction
- `get_donor_amount(address)` — reads individual donor contribution

See `frontend/src/contract.js` for full implementation.

### ✅ Transaction Status Visible

Transaction lifecycle shown in the UI:
1. 🔨 **Building** — constructing the transaction
2. ✍️ **Signing** — waiting for wallet approval
3. 📡 **Submitting** — broadcasting to network
4. ⏳ **Pending** — confirming on-chain (polled every 2s)
5. ✅ **Success** — confirmed with Explorer link
6. ❌ **Failed** — error message shown

### ✅ Transaction Hash (Example)

```
TX Hash: a1b2c3d4e5f6...
Explorer: https://stellar.expert/explorer/testnet/tx/YOUR_TX_HASH
```

> Replace with your actual transaction hash after making a test donation.

### ✅ Minimum 2+ Meaningful Commits

Commit history includes:
1. `feat: initialize project structure and Soroban crowdfunding contract`
2. `feat: implement multi-wallet frontend with React and real-time polling`
3. `fix: add error handling for wallet not found, rejected, insufficient balance`
4. `docs: add README with deployment instructions and contract address`

---

## 🏗 Project Structure

```
stellar-fund/
│
├── contract/
│   └── crowdfunding/
│       ├── src/
│       │   ├── lib.rs          # Smart contract (donate, withdraw, refund)
│       │   └── test.rs         # Unit tests
│       ├── Cargo.toml
│       └── Cargo.lock
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── App.jsx             # Main UI component
│   │   ├── main.jsx            # React entry point
│   │   ├── wallet.js           # StellarWalletsKit + error handling
│   │   ├── contract.js         # Soroban contract calls + event listening
│   │   ├── config.js           # Network config, contract ID, helpers
│   │   └── styles.css          # Full dark-mode UI styles
│   ├── .env                    # Environment variables (gitignored)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## ⚙️ Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Rust](https://rustup.rs/) (for contract compilation)
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools/stellar-cli) v21+
- [Freighter Wallet](https://freighter.app/) (for testing)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/stellar-fund.git
cd stellar-fund
```

---

### 2. Install Rust & Soroban Target

```bash
rustup target add wasm32-unknown-unknown
cargo install --locked stellar-cli --features opt
```

---

### 3. Deploy the Smart Contract

```bash
# Navigate to contract directory
cd contract/crowdfunding

# Build the contract
stellar contract build

# Generate a testnet identity (skip if you already have one)
stellar keys generate --global alice --network testnet

# Fund your testnet account
stellar keys fund alice --network testnet

# Deploy to testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/crowdfunding.wasm \
  --source alice \
  --network testnet

# ✅ This outputs your CONTRACT_ID — copy it!
```

---

### 4. Initialize the Campaign

```bash
# Get the native XLM Stellar Asset Contract address
stellar contract id asset --asset native --network testnet
# Example: CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCN4

# Set deadline (Unix timestamp = current time + 30 days)
# Example: $(date -d "+30 days" +%s) on Linux
DEADLINE=1740000000  # replace with actual timestamp

# Initialize the campaign
stellar contract invoke \
  --id YOUR_CONTRACT_ID \
  --source alice \
  --network testnet \
  -- initialize \
  --owner $(stellar keys address alice) \
  --token NATIVE_XLM_SAC_ADDRESS \
  --goal 1000000000 \
  --title "Build a Community Hackspace" \
  --description "Help us build a decentralized maker space for Web3 developers in our city!" \
  --deadline $DEADLINE

# ✅ Save the transaction hash from the output!
```

---

### 5. Configure Frontend

```bash
cd ../../frontend

# Copy environment template
cp .env .env.local

# Edit .env.local and fill in:
# VITE_CONTRACT_ID=your_deployed_contract_address
# VITE_TOKEN_ID=native_xlm_sac_address
```

---

### 6. Install & Run Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

---

### 7. Test a Donation

1. Open the app at `http://localhost:5173`
2. Click **Connect Wallet** → select Freighter
3. Make sure Freighter is set to **Testnet**
4. Fund your testnet account at [https://friendbot.stellar.org](https://friendbot.stellar.org/?addr=YOUR_ADDRESS)
5. Enter an amount (e.g., `10 XLM`) and click **Donate Now**
6. Approve in Freighter
7. Watch the transaction status update in real-time!

---

## 🌐 Live Demo

> Deploy to Vercel:
```bash
cd frontend
npm run build
npx vercel --prod
```

Live URL: `https://stellar-fund.vercel.app` *(update after deployment)*

---

## 📡 Contract Methods

| Method | Type | Description |
|--------|------|-------------|
| `initialize(owner, token, goal, title, desc, deadline)` | Write | Set up campaign |
| `donate(donor, amount)` | Write | Donate XLM (in stroops) |
| `withdraw(recipient)` | Write | Owner withdraws after goal met |
| `refund(donor)` | Write | Donor gets refund if goal not met |
| `get_campaign_info()` | Read | Returns all campaign data |
| `get_total_raised()` | Read | Total XLM raised |
| `get_donor_amount(address)` | Read | Amount donated by address |
| `is_active()` | Read | Whether campaign is active |

---

## 🧪 Running Contract Tests

```bash
cd contract/crowdfunding
cargo test
```

Tests cover:
- ✅ Campaign initialization
- ✅ Successful donation
- ✅ Error: Insufficient balance (panics correctly)
- ✅ Error: Zero amount (panics correctly)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contract | Rust + Soroban SDK v21 |
| Blockchain | Stellar Testnet |
| Frontend | React 18 + Vite |
| Wallet Integration | `@creit.tech/stellar-wallets-kit` |
| Stellar SDK | `@stellar/stellar-sdk` v12 |
| Styling | Pure CSS (no framework) |

---

## 📜 License

MIT