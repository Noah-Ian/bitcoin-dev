import { Router } from "express";
import { blockchainInfo } from "../controllers/blockchain.controller.js";

const router = Router();

router.get("/", blockchainInfo);

export default router;