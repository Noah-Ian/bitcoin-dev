import { randomUUID } from "crypto";
import { getNewAddress } from "./wallet.js";
import { bitcoinRpc } from "./rpc.js";

export type Payment = {
  id: string;
  address: string;
  amount: number;
  status: "pending" | "paid";
};

const payments: Payment[] = [];

export async function createPayment(amount: number) {
  const address = await getNewAddress();

  const payment: Payment = {
    id: randomUUID(),
    address,
    amount,
    status: "pending"
  };

  payments.push(payment);

  return payment;
}

export async function getPaymentStatus(id: string) {
  const payment = payments.find(
    (payment) => payment.id === id
  );

  if (!payment) {
    return null;
  }

  const transactions = await checkPayment(payment);

  return {
    ...payment,
    received: transactions
  };
}

export async function checkPayment(
  payment: Payment
) {
  const transactions = await bitcoinRpc(
    "listreceivedbyaddress",
    [0, true, payment.address]
  );

  return transactions;

}