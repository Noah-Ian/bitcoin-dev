import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  getTransactionById,
  send,
    history,
    feeEstimate
} from "../controllers/transaction.controller.js";

const router = Router();


router.get("/history", asyncHandler(history));
router.get("/fee-estimate", asyncHandler(feeEstimate))
router.get("/:txid", asyncHandler(getTransactionById));
router.post("/send", asyncHandler(send));

export default router;