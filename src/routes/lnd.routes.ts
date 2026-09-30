import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { nodeInfo } from "../controllers/lnd.controller.js";

const router = Router();

router.get("/info", asyncHandler(nodeInfo));

export default router;