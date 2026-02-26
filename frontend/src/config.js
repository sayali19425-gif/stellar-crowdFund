const CONFIG = {
  CONTRACT_ID: import.meta.env.VITE_CONTRACT_ID,
  RPC_URL: import.meta.env.VITE_RPC_URL,
  NETWORK_PASSPHRASE: import.meta.env.VITE_NETWORK_PASSPHRASE,
};

console.log("CONFIG OK", CONFIG.CONTRACT_ID);

export default CONFIG;