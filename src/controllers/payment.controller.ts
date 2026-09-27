import type { Request, Response } from "express";

import {
  createPayment,
  getPaymentStatus
} from "../bitcoin/payment.js";

import { createPaymentSchema, getPaymentSchema } from "../schema/payment.schema.js";

export async function create(
  req: Request,
  res: Response
) {
  const data = createPaymentSchema.parse(req.body);

  const payment = await createPayment(data.amount);

  res.status(201).json(payment);
}

export async function get(
  req: Request,
  res: Response
) {
  const data = getPaymentSchema.parse(req.params);  
  const payment = await getPaymentStatus(
    data.id
  );

  if (!payment) {
    return res.status(404).json({
      error: "Payment not found"
    });
  }

  res.json(payment);
}