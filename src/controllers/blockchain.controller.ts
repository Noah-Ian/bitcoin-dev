import type { Request, Response } from "express";
import { getBlockchainInfo } from "../bitcoin/blockchain.js";

export async function blockchainInfo(
  req: Request,
  res: Response
) {
  try {
    const blockchain = await getBlockchainInfo();

    res.json(blockchain);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get blockchain information"
    });
  }
}