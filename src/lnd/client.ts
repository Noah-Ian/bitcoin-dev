import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import fs from "fs";
import path from "path";

const PROTO_PATH = path.join(
  process.cwd(),
  "src/lnd/lightning.proto"
);

const MACAROON_PATH = path.join(
  process.cwd(),
  "src/lnd/admin.macaroon"
);

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);

const lndrpc = grpc.loadPackageDefinition(
  packageDefinition) as any;

const lnrpc = lndrpc.lnrpc;  

const macaroon = fs
  .readFileSync(MACAROON_PATH)
  .toString("hex");

const macaroonCreds = grpc.credentials.createFromMetadataGenerator(
  (_params, callback) => {
    const metadata = new grpc.Metadata();

    metadata.add("macaroon", macaroon);

    callback(null, metadata);
  }
);

const sslCreds = grpc.credentials.createSsl();

const credentials = grpc.credentials.combineChannelCredentials(
  sslCreds,
  macaroonCreds
);

export const lndClient = new (lnrpc.Lightning as any)(
  "127.0.0.1:10009",
  credentials
);