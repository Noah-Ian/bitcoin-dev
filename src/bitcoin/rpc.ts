import "dotenv/config";

const RPC_URL = process.env.RPC_URL!;
const RPC_USER = process.env.RPC_USER!;
const RPC_PASSWORD = process.env.RPC_PASSWORD!;

export async function bitcoinRpc(
  method: string,
  params: unknown[] = [],
  wallet?: string
) {
  const auth = Buffer
    .from(`${RPC_USER}:${RPC_PASSWORD}`)
    .toString("base64");

  const url = wallet
    ? `${RPC_URL}/wallet/${wallet}`
    : RPC_URL;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`,
    },
    body: JSON.stringify({
      jsonrpc: "1.0",
      id: "bitcoin-dev",
      method,
      params,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.result;
}