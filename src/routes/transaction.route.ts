import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  getTransactionById,
  send,
    history
} from "../controllers/transaction.controller.js";

const router = Router();

router.get("/:txid", asyncHandler(getTransactionById));
router.post("/send", asyncHandler(send));
router.get("/history", asyncHandler(history));

export default router;