import { z } from "zod";

export const createPaymentSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be greater than 0")
});

export const getPaymentSchema = z.object({
  id: z.string().min(1, "Payment ID is required")
});