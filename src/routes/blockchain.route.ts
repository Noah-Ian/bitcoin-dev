import { Router } from "express";
import { blockchainInfo } from "../controllers/blockchain.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(blockchainInfo));

export default router;