import type { Request, Response } from "express";

import {
  getTransaction,
  sendBitcoin,
    getTransactionHistory,
    estimateFee
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
}

export async function history(
  req: Request,
  res: Response
) {
  const transactions = await getTransactionHistory();

  res.json({
    transactions
  });
}

export async function feeEstimate(
  req: Request,
  res: Response
) {
  const blocks = Number(req.query.blocks) || 6;

  const fee = await estimateFee(blocks);

  res.json({
    targetBlocks: blocks,
    fee
  });
}