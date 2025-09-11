import prisma from "../config/db.js";

export const placeBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Bid amount must be a valid number",
      });
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const auction = await tx.auction.findUnique({
        where: { id: parseInt(id, 10) },
        include: { bids: { orderBy: { amount: "desc" } } },
      });

      if (!auction) {
        return { error: { status: 404, message: "Auction not found" } };
      }
      if (auction.isClosed) {
        return { error: { status: 400, message: "Auction is already closed" } };
      }
      if (new Date() > auction.endAt) {
        return { error: { status: 400, message: "Auction has already ended" } };
      }

      const highestBid =
        auction.bids.length > 0 ? auction.bids[0].amount : auction.startingBid;

      if (amount <= highestBid) {
        return {
          error: {
            status: 400,
            message: `Bid must be greater than the current highest bid (${highestBid})`,
          },
        };
      }

      const newBid = await tx.bid.create({
        data: {
          amount: parseFloat(amount),
          userUid: user.firebaseUid,
          auctionId: auction.id,
        },
        include: { user: true },
      });

      return { newBid, auction };
    });

    if (result.error) {
      return res.status(result.error.status).json({
        success: false,
        message: result.error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      data: {
        bid: result.newBid,
        auctionId: result.auction.id,
        highestBid: result.newBid.amount,
      },
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place bid",
      error: error.message,
    });
  }
};

export const getAuctionBids = async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await prisma.auction.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        bids: {
          orderBy: { amount: "desc" },
          include: { user: true },
        },
      },
    });

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    if (!auction.bids || auction.bids.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bids placed yet for this auction",
        data: {
          auctionId: auction.id,
          itemId: auction.itemId,
          startingBid: auction.startingBid,
          highestBid: null,
          top3Bids: [],
        },
      });
    }

    const highestBid = auction.bids[0];
    const top3Bids = auction.bids.slice(0, 3);

    return res.status(200).json({
      success: true,
      message: "Auction bids fetched successfully",
      data: {
        auctionId: auction.id,
        itemId: auction.itemId,
        startingBid: auction.startingBid,
        highestBid,
        top3Bids,
      },
    });
  } catch (error) {
    console.error("Error fetching bids:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bids",
      error: error.message,
    });
  }
};
