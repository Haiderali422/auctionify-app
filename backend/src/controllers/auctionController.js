import { auctionQueue } from "../queues/auctionQueue.js";
import prisma from "../config/db.js";

export const startAuction = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { starting_bid, duration } = req.body;

    if (!starting_bid || !duration) {
      return res
        .status(400)
        .json({ error: "starting_bid and duration are required" });
    }

    const user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.uid },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId) },
    });
    if (!item || item.owner_id !== user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to start auction for this item" });
    }

    if (item.auction_enabled) {
      return res
        .status(400)
        .json({ error: "Auction already started for this item" });
    }

    const end_at = new Date(Date.now() + duration * 60 * 1000);

    const auction = await prisma.auction.create({
      data: {
        starting_bid: parseFloat(starting_bid),
        end_at,
        is_closed: false,
        item_id: item.id,
      },
    });
 
    await prisma.item.update({
      where: { id: item.id },
      data: { auction_enabled: true },
    });

    await auctionQueue.add(
      "endAuction",
      { auctionId: auction.id },
      { delay: duration * 60 * 1000 }
    );

    res.json({ message: "Auction started", auction });
  } catch (error) {
    console.error("Error starting auction:", error);
    res.status(500).json({ error: "Failed to start auction" });
  }
};
