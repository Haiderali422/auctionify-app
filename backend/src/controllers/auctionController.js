import { auctionQueue } from "../queues/auctionQueue.js";
import prisma from "../config/db.js";

export const startAuction = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { startingBid, duration } = req.body;

    if (!startingBid || !duration) {
      return res.status(400).json({
        success: false,
        message: "startingBid and duration are required",
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

    const item = await prisma.item.findUnique({
      where: { id: parseInt(itemId, 10) },
    });

    if (!item || item.ownerUid !== user.firebaseUid) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to start auction for this item",
      });
    }

    if (item.auctionEnabled) {
      return res.status(400).json({
        success: false,
        message: "Auction already started for this item",
      });
    }

    const endAt = new Date(Date.now() + duration * 60 * 1000);

    const [auction] = await prisma.$transaction([
      prisma.auction.create({
        data: {
          startingBid: parseFloat(startingBid),
          endAt,
          isClosed: false,
          itemId: item.id,
        },
      }),
      prisma.item.update({
        where: { id: item.id },
        data: { auctionEnabled: true },
      }),
    ]);

    await auctionQueue.add(
      "endAuction",
      { auctionId: auction.id },
      { delay: duration * 60 * 1000 }
    );

    return res.status(201).json({
      success: true,
      message: "Auction started successfully",
      data: {
        auctionId: auction.id,
        itemId: auction.itemId,
        startingBid: auction.startingBid,
        endAt: auction.endAt,
        isClosed: auction.isClosed,
      },
    });
  } catch (error) {
    console.error("Error starting auction:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to start auction",
      error: error.message,
    });
  }
};
