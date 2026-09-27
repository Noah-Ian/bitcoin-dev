import type { Request, Response } from "express";

import { getBlockchainInfo } from "../bitcoin/blockchain.js";

export async function blockchainInfo(
  req: Request,
  res: Response
) {
  const blockchain = await getBlockchainInfo();

  res.json(blockchain);
}