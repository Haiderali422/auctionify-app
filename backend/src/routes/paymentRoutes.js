import express from "express";
import { verifyFirebaseToken } from "../middlewares/firebaseAuth.js";
import { createCheckoutSession } from "../controllers/paymentController.js";

const router = express.Router();

router.post(
  "/create-checkout-session",
  verifyFirebaseToken,
  createCheckoutSession
);

export default router;
