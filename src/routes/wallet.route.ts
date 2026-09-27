import { Router } from "express";

import {
  balance,
  newAddress,
  utxos
} from "../controllers/wallet.controller.js";

const router = Router();

router.get("/balance", balance);
router.get("/address", newAddress);
router.get("/utxos", utxos);

export default router;