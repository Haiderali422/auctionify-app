import prisma from "../config/db.js";

export const placeBid = async (req, res) => {
  try {
    const { id } = req.params; 
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res
        .status(400)
        .json({ error: "Bid amount is required and must be a number" });
    }

    const user = await prisma.user.findUnique({
      where: { firebase_uid: req.user.uid },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const auction = await prisma.auction.findUnique({
      where: { id: parseInt(id) },
      include: { bids: { orderBy: { amount: "desc" } } },
    });

    if (!auction) return res.status(404).json({ error: "Auction not found" });
    if (auction.is_closed)
      return res.status(400).json({ error: "Auction already closed" });

    if (new Date() > auction.end_at) {
      return res.status(400).json({ error: "Auction has already ended" });
    }

    const highestBid =
      auction.bids.length > 0 ? auction.bids[0].amount : auction.starting_bid;

    if (amount <= highestBid) {
      return res
        .status(400)
        .json({
          error: `Bid must be greater than current highest bid (${highestBid})`,
        });
    }

    const newBid = await prisma.bid.create({
      data: {
        amount: parseFloat(amount),
        user_id: user.id,
        auction_id: auction.id,
      },
      include: {
        user: true,
      },
    });

    res.status(201).json({
      message: "Bid placed successfully",
      bid: newBid,
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Failed to place bid" });
  }
};



export const getAuctionBids = async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await prisma.auction.findUnique({
      where: { id: parseInt(id) },
      include: {
        bids: {
          orderBy: { amount: "desc" },
          include: { user: true },
        },
      },
    });

    if (!auction) return res.status(404).json({ error: "Auction not found" });

    const highestBid = auction.bids.length > 0 ? auction.bids[0] : null;
    const top3Bids = auction.bids.slice(0, 3);

    res.json({
      auctionId: auction.id,
      itemId: auction.item_id,
      highestBid,
      top3Bids,
    });
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ error: "Failed to fetch bids" });
  }
};
