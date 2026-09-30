import { lndClient } from "./client.js";

export function getWalletBalance() {
  return new Promise((resolve, reject) => {
    lndClient.walletBalance({}, (error: Error | null, response: any) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });
}