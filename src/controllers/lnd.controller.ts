import type { Request, Response } from "express";
import { getNodeInfo } from "../lnd/node.js";
import { getWalletBalance } from "../lnd/wallet.js";

export async function nodeInfo(req: Request, res: Response) {
  const info = (await getNodeInfo()) as any;

  res.json({
    identityPubkey: info.identity_pubkey,
    alias: info.alias,
    network: info.chains?.[0]?.network,
    version: info.version,
    syncedToChain: info.synced_to_chain
  });
}

export async function walletBalance(req: Request, res: Response) {
  const balance = await getWalletBalance();

  res.json(balance);
}