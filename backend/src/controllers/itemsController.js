import prisma from "../config/db.js";

export const createItem = async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "title, description, and imageUrl are required",
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

    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        imageUrl,
        auctionEnabled: false,
        ownerUid: user.firebaseUid,
      },
      include: { owner: true },
    });

    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: {
        itemId: newItem.id,
        title: newItem.title,
        description: newItem.description,
        imageUrl: newItem.imageUrl,
        auctionEnabled: newItem.auctionEnabled,
        ownerUid: newItem.ownerUid,
      },
    });
  } catch (error) {
    console.error("Error creating item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create item",
      error: error.message,
    });
  }
};

export const getAddedItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: req.user.uid,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const items = await prisma.item.findMany({
      where: {
        ownerUid: user.firebaseUid,
        auctionEnabled: false,
        auction: null,
      },
      include: { owner: true },
    });
    if (!items || items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No listed items found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Items fetched successfully",
      data: items.map((item) => ({
        itemId: item.id,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        auctionEnabled: item.auctionEnabled,
        ownerUid: item.ownerUid,
      })),
    });
  } catch (error) {
    console.error("Error fetching added items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch added items",
      error: error.message,
    });
  }
};

export const getListedItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const items = await prisma.item.findMany({
      where: {
        ownerUid: user.firebaseUid,
        auctionEnabled: true,
        auction: { isClosed: false },
      },
      include: {
        owner: true,
        auction: {
          include: {
            bids: {
              orderBy: { amount: "desc" },
              take: 3,
              include: { user: true },
            },
          },
        },
      },
    });

    if (!items || items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No listed items found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Listed items fetched successfully",
      data: items.map((item) => {
        const topBids =
          item.auction?.bids?.length > 0
            ? item.auction.bids.map((bid) => ({
                bidId: bid.id,
                amount: bid.amount,
                bidderId: bid.userId,
                bidderName: bid.user?.name || null,
                createdAt: bid.createdAt,
              }))
            : [];

        return {
          itemId: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          auctionEnabled: item.auctionEnabled,
          ownerUid: item.ownerUid,
          auction: item.auction
            ? {
                auctionId: item.auction.id,
                startingBid: item.auction.startingBid,
                endAt: item.auction.endAt,
                isClosed: item.auction.isClosed,
                highestBid: topBids.length > 0 ? topBids[0] : null,
                topBids,
              }
            : null,
        };
      }),
    });
  } catch (error) {
    console.error("Error fetching listed items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch listed items",
      error: error.message,
    });
  }
};

export const getAllListedItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      where: {
        auctionEnabled: true,
        auction: { isClosed: false },
      },
      include: {
        owner: true,
        auction: {
          include: {
            bids: {
              orderBy: { amount: "desc" },
              take: 3,
              include: { user: true },
            },
          },
        },
      },
    });

    if (!items || items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No listed items found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "All listed items fetched successfully",
      data: items.map((item) => {
        const topBids =
          item.auction?.bids?.length > 0
            ? item.auction.bids.map((bid) => ({
                bidId: bid.id,
                amount: bid.amount,
                bidderId: bid.userId,
                bidderName: bid.user?.name || null,
                createdAt: bid.createdAt,
              }))
            : [];

        return {
          itemId: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          auctionEnabled: item.auctionEnabled,
          ownerUid: item.ownerUid,
          auction: item.auction
            ? {
                auctionId: item.auction.id,
                startingBid: item.auction.startingBid,
                endAt: item.auction.endAt,
                isClosed: item.auction.isClosed,
                highestBid: topBids.length > 0 ? topBids[0] : null,
                topBids,
              }
            : null,
        };
      }),
    });
  } catch (error) {
    console.error("Error fetching all listed items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all listed items",
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, auctionEnabled } = req.body;

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
      where: { id: parseInt(id, 10) },
    });

    if (!item || item.ownerUid !== user.firebaseUid) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this item or no such item exists",
      });
    }

    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id, 10) },
      data: {
        title: title ?? item.title,
        description: description ?? item.description,
        imageUrl: imageUrl ?? item.imageUrl,
        auctionEnabled:
          typeof auctionEnabled === "boolean"
            ? auctionEnabled
            : item.auctionEnabled,
      },
      include: { owner: true },
    });

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: {
        itemId: updatedItem.id,
        title: updatedItem.title,
        description: updatedItem.description,
        imageUrl: updatedItem.imageUrl,
        auctionEnabled: updatedItem.auctionEnabled,
        ownerUid: updatedItem.ownerUid,
      },
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update item",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

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
      where: { id: parseInt(id, 10) },
    });

    if (!item || item.ownerUid !== user.firebaseUid) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this item or No such item exists",
      });
    }

    await prisma.item.delete({ where: { id: parseInt(id, 10) } });

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: { itemId: parseInt(id, 10) },
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: error.message,
    });
  }
};

export const getPurchasedItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const purchased = await prisma.item.findMany({
      where: {
        auction: {
          winnerUid: user.firebaseUid,
          payment: { status: "SUCCESS" },
        },
      },
      include: {
        auction: true,
      },
    });

    if (!purchased || purchased.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No purchased items found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Purchased items fetched successfully",
      data: purchased.map((item) => ({
        itemId: item.id,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        auctionId: item.auction?.id,
        auctionClosed: item.auction?.isClosed,
        winnerUid: item.auction?.winnerUid,
        paymentStatus: item.auction?.payment?.status ?? null,
      })),
    });
  } catch (error) {
    console.error("Error fetching purchased items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch purchased items",
      error: error.message,
    });
  }
};

export const getUnSoldItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const unsold = await prisma.item.findMany({
      where: {
        ownerUid: user.firebaseUid,
        auction: {
          isClosed: true,
          winnerUid: null,
        },
      },
      include: {
        auction: true,
        owner: true,
      },
    });

    if (!unsold || unsold.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No unsold items found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Unsold items fetched successfully",
      data: unsold.map((item) => ({
        itemId: item.id,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        auctionId: item.auction?.id,
        auctionClosed: item.auction?.isClosed,
        winnerUid: item.auction?.winnerUid,
      })),
    });
  } catch (error) {
    console.error("Error fetching unsold items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch unsold items",
      error: error.message,
    });
  }
};

export const getSoldItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const sold = await prisma.item.findMany({
      where: {
        ownerUid: user.firebaseUid,
        auction: {
          isClosed: true,
          winnerUid: { not: null },
          payment: { status: "SUCCESS" },
        },
      },
      include: {
        auction: true,
      },
    });

    if (!sold || sold.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No sold items found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sold items fetched successfully",
      data: sold.map((item) => ({
        itemId: item.id,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        auctionId: item.auction?.id,
        auctionClosed: item.auction?.isClosed,
        winnerUid: item.auction?.winnerUid,
        paymentStatus: item.auction?.payment?.status ?? null,
      })),
    });
  } catch (error) {
    console.error("Error fetching sold items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sold items",
      error: error.message,
    });
  }
};

export const getPayableItems = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.user.uid },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const payableAuctions = await prisma.auction.findMany({
      where: {
        isClosed: true,
        winnerUid: user.firebaseUid,
        payment: null,
      },
      include: {
        item: true,
        bids: {
          orderBy: { amount: "desc" },
          take: 1,
        },
      },
    });

    if (payableAuctions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No payable items found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payable items fetched successfully",
      data: payableAuctions.map((auction) => ({
        auctionId: auction.id,
        item: auction.item,
        winningBid: auction.bids[0]?.amount || auction.startingBid,
        payableAmount: auction.bids[0]?.amount || auction.startingBid,
      })),
    });
  } catch (error) {
    console.error("Error fetching payable items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payable items",
      error: error.message,
    });
  }
};
