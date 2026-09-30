import { lndClient } from "./client.js";

export function getNodeInfo() {
  return new Promise((resolve, reject) => {
    lndClient.getInfo({}, (error: Error | null, response: any) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(response);
    });
  });
}