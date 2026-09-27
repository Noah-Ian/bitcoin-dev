import type { Request, Response } from "express";
import {
  getTransaction,
  sendBitcoin
} from "../bitcoin/transactions.js";

export async function getTransactionById(
  req: Request,
  res: Response
) {
  try {
    const { txid } = req.params;

    if (typeof txid !== "string" || !txid) {
      return res.status(400).json({
        error: "Invalid transaction ID"
      });
    }

    const transaction = await getTransaction(txid);

    res.json({
      txid,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get transaction"
    });
  }
}

export async function send(
  req: Request,
  res: Response
) {
  try {
    const { address, amount } = req.body;

    if (!address) {
      return res.status(400).json({
        error: "Address is required"
      });
    }

    if (
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return res.status(400).json({
        error: "Amount must be a positive number"
      });
    }

    const txid = await sendBitcoin(
      address,
      amount
    );

    res.json({
      txid
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to send Bitcoin"
    });
  }
} 