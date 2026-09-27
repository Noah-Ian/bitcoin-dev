import { bitcoinRpc } from "./rpc.js";
import "dotenv/config";


const wallet =  process.env.BITCOIN_WALLET!;

export async function getBalance() {
    return bitcoinRpc("getbalance", [], wallet);
}

export async function getNewAddress() {
    return bitcoinRpc("getnewaddress", [], wallet);
}

export async function getUTXOs() {
    return bitcoinRpc("listunspent", [], wallet);
}
