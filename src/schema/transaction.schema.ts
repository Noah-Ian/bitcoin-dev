import {z} from "zod";

export const sendBitcoinSchema = z.object({
  address: z.string().min(1, "Address is required"),

  amount: z
    .number()
    .positive("Amount must be greater than 0")
});