import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { nodeInfo, walletBalance } from "../controllers/lnd.controller.js";

const router = Router();

router.get("/info", asyncHandler(nodeInfo));
router.get("/wallet/balance", asyncHandler(walletBalance));

export default router;