import type { Request, Response } from "express";
import {
  getBalance,
  getNewAddress,
  getUTXOs
} from "../bitcoin/wallet.js";

export async function balance(
  req: Request,
  res: Response
) {
  try {
    const balance = await getBalance();

    res.json({ balance });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get wallet balance"
    });
  }
}

export async function newAddress(
  req: Request,
  res: Response
) {
  try {
    const address = await getNewAddress();

    res.json({ address });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate address"
    });
  }
}

export async function utxos(
  req: Request,
  res: Response
) {
  try {
    const data = await getUTXOs();

    res.json({
      utxos: data
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get wallet UTXOs"
    });
  }
}