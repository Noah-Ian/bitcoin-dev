import type { Request, Response } from "express";

import {
  getTransaction,
  sendBitcoin
} from "../bitcoin/transactions.js";

import { sendBitcoinSchema, getTransactionSchema} from "../schema/transaction.schema.js";
import { validateAddress } from "../bitcoin/wallet.js";

export async function getTransactionById(
  req: Request,
  res: Response
) {
  const { txid } = getTransactionSchema.parse(req.params);

  const transaction = await getTransaction(txid);

  res.json({
    txid,
    transaction
  });
}

export async function send(
  req: Request,
  res: Response
) {
  const data = sendBitcoinSchema.parse(req.body);

  const validation = await validateAddress(data.address);

  if (!validation.isvalid) {
    res.status(400).json({
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
}