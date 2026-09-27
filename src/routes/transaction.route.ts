import { Router } from "express";

import {
  getTransactionById,
  send
} from "../controllers/transaction.controller.js";

const router = Router();

router.get("/:txid", getTransactionById);

router.post("/send", send);

export default router;