import type { Request, Response } from "express";
import {addressSchema} from "../schema/wallet.schema.js";
import {
  getBalance,
  getNewAddress,
  getUTXOs,
  validateAddress
} from "../bitcoin/wallet.js";

export async function balance(
  req: Request,
  res: Response
) {
    const balance = await getBalance();

    res.json({ balance });

}

export async function newAddress(
  req: Request,
  res: Response
) {
 
    const address = await getNewAddress();

    res.json({ address });
}

export async function utxos(
  req: Request,
  res: Response
) {
  
    const data = await getUTXOs();

    res.json({
      utxos: data
    });
  
}

export async function validate(
  req: Request,
  res: Response
) {
    const data = addressSchema.parse(req.body);
    const result  = await validateAddress (data.address);

    res.json({
      result
    });
}