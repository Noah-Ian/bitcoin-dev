import { bitcoinRpc } from "./rpc.js";

export async function getBlockchainInfo() {
  return bitcoinRpc("getblockchaininfo");
}