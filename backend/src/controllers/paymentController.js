import prisma from "../config/db.js";
import stripe from "../config/stripe.js";
import { PaymentStatus } from "@prisma/client";

export const createCheckoutSession = async (req, res) => {
  try {
    const { auctionId, successUrl, cancelUrl } = req.body;
    if (!auctionId) {
      return res.status(400).json({ error: "auctionId is required" });
    }

    const authUid = req.user?.uid;
    if (!authUid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid: authUid },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found in DB" });
    }

    const auction = await prisma.auction.findUnique({
      where: { id: Number(auctionId) },
      include: {
        item: true,
        bids: { orderBy: { amount: "desc" }, take: 1 },
      },
    });

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    if (!auction.isClosed) {
      return res.status(400).json({ error: "Auction is not closed yet" });
    }

    if (!auction.winnerUid || auction.winnerUid !== user.firebaseUid) {
      return res
        .status(403)
        .json({ error: "You are not the winner of this auction" });
    }

    const highestBid = auction.bids[0];
    if (!highestBid) {
      return res
        .status(400)
        .json({ error: "Auction has no bids. Nothing to pay." });
    }

    const amount = highestBid.amount;
    const unitAmountCents = Math.round(Number(amount) * 100);

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
            unit_amount: unitAmountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        auctionId: auction.id.toString(),
      },
      success_url: successUrl || process.env.FRONTEND_SUCCESS_URL,
      cancel_url: cancelUrl || process.env.FRONTEND_CANCEL_URL,
    });

    await prisma.payment.upsert({
      where: { auctionId: auction.id },
      update: {
        amountCents: unitAmountCents,
        status: PaymentStatus.PENDING,
        stripePaymentId: session.id,
        userUid: user.firebaseUid,
      },
      create: {
        amountCents: unitAmountCents,
        status: PaymentStatus.PENDING,
        stripePaymentId: session.id,
        auctionId: auction.id,
        userUid: user.firebaseUid,
      },
    });

    return res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
};
