import prisma from "../config/db.js";
import stripe from "../config/stripe.js";
import { PaymentStatus } from "@prisma/client";

export const createCheckoutSession = async (req, res) => {
  try {
    const { auctionId, successUrl, cancelUrl } = req.body;

    if (!auctionId) {
      return res.status(400).json({
        success: false,
        message: "auctionId is required",
      });
    }

    const authUid = req.user?.uid;
    if (!authUid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid: authUid },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in DB",
      });
    }

    const auction = await prisma.auction.findUnique({
      where: { id: Number(auctionId) },
      include: {
        item: true,
        bids: { orderBy: { amount: "desc" }, take: 1 },
      },
    });

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction not found",
      });
    }

    if (!auction.isClosed) {
      return res.status(400).json({
        success: false,
        message: "Auction is not closed yet",
      });
    }

    if (!auction.winnerUid || auction.winnerUid !== user.firebaseUid) {
      return res.status(403).json({
        success: false,
        message: "You are not the winner of this auction",
      });
    }

    if (auction.bids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No bids placed. No payment session required.",
      });
    }

    const highestBid = auction.bids[0];
    const amount = highestBid.amount;
    const amountCents = Math.round(Number(amount) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: auction.item?.title || `Auction #${auction.id}`,
              description: auction.item?.description || "Auction item",
              images: auction.item?.imageUrl ? [auction.item.imageUrl] : [],
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl || process.env.FRONTEND_SUCCESS_URL,
      cancel_url: cancelUrl || process.env.FRONTEND_CANCEL_URL,
    });

    await prisma.payment.upsert({
      where: { auctionId: auction.id },
      update: {
        amountCents,
        status: PaymentStatus.PENDING,
        stripePaymentId: session.id,
        userUid: user.firebaseUid,
      },
      create: {
        amountCents,
        status: PaymentStatus.PENDING,
        stripePaymentId: session.id,
        auctionId: auction.id,
        userUid: user.firebaseUid,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Checkout session created successfully",
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create checkout session",
      error: error.message,
    });
  }
};
