import type { Request, Response } from "express";
import { z } from "zod";
import { sendBitcoinSchema } from "../schema/transaction.schema.js";
import { validateAddress } from "../bitcoin/wallet.js";
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
    const data = sendBitcoinSchema.parse(req.body);

    const validation = await validateAddress(
      data.address
    );

    if (!validation.isvalid) {
      return res.status(400).json({
        error: "Invalid Bitcoin address"
      });
    }

    const txid = await sendBitcoin(
      data.address,
      data.amount
    );

    res.json({
      txid
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.issues
      });
    }

    res.status(500).json({
      error: "Failed to send Bitcoin"
    });
  }
} 