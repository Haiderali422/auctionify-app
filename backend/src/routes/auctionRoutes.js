import express from "express";
import { verifyFirebaseToken } from "../middlewares/firebaseAuth.js";
import { startAuction } from "../controllers/auctionController.js";

const router = express.Router();

router.post("/start/:itemId", verifyFirebaseToken, startAuction);

export default router;
