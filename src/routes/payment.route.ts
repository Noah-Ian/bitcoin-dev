import { Router } from "express";

import { asyncHandler } from "../middleware/asyncHandler.js";

import {
  create,
  get
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/", asyncHandler(create));
router.get("/:id", asyncHandler(get));

export default router;