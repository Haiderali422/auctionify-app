import express from "express";
import { verifyFirebaseToken } from "../middlewares/firebaseAuth.js";
import { getAuctionBids, placeBid } from "../controllers/bidController.js";

const router = express.Router();

router.post("/:id/bids", verifyFirebaseToken, placeBid);
router.get("/:id/bids", verifyFirebaseToken, getAuctionBids);

export default router;
