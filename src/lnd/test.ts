import { lndClient } from "./client.js";

lndClient.getInfo({}, (error: Error | null, response: any) => {
  if (error) {
    console.error("LND connection failed:");
    console.error(error);
    return;
  }

  console.log("Connected to LND!");
  console.log("Node public key:", response.identity_pubkey);
  console.log("Alias:", response.alias);
  console.log("Network:", response.chains?.[0]?.network);
});