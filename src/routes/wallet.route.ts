import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";

import {
  balance,
  newAddress,
  utxos,
  validate
} from "../controllers/wallet.controller.js";

const router = Router();

router.get("/balance", asyncHandler(balance));
router.get("/address", asyncHandler(newAddress));
router.get("/utxos", asyncHandler(utxos));
router.post("/validate-address", asyncHandler(validate));

export default router;