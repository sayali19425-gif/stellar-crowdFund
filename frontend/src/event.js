import CONFIG from "./config";

const { RPC_URL } = CONFIG;

export async function getLatestTransaction(hash) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTransaction",
      params: { hash }
    }),
  });

  const data = await response.json();
  return data.result;
}