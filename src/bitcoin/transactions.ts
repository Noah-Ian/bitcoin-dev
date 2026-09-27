import { bitcoinRpc } from "./rpc.js";
import "dotenv/config";


const wallet =  process.env.BITCOIN_WALLET!;

export async function getTransaction(txid: string) {
  const rawTx = await bitcoinRpc(
    "getrawtransaction",
    [txid]
  );

  const decodedTx = await bitcoinRpc(
    "decoderawtransaction",
    [rawTx]
  );

  return decodedTx;
}

export async function sendBitcoin(
  address: string,
  amount: number
) {
  return bitcoinRpc(
    "sendtoaddress",
    [address, amount],
    wallet
  );
}

export async function getTransactionHistory() {
  return bitcoinRpc(
    "listtransactions",
    ["*", 100],
    wallet
  );
}