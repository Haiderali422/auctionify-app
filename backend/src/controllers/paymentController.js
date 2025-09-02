import prisma from "../config/db.js";
import stripe from "../config/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { auction_id } = req.body;
    if (!auction_id) {
      return res.status(400).json({ error: "auction_id is required" });
    }

    const authUid = req.user?.uid;
    if (!authUid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { firebase_uid: authUid },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found in DB" });
    }

    const auction = await prisma.auction.findUnique({
      where: { id: Number(auction_id) },
      include: {
        item: true,
        bids: { orderBy: { amount: "desc" }, take: 1 },
      },
    });

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    if (!auction.is_closed) {
      return res.status(400).json({ error: "Auction is not closed yet" });
    }
    if (!auction.winner_id || auction.winner_id !== user.id) {
      return res
        .status(403)
        .json({ error: "You are not the winner of this auction" });
    }

    const highestBid = auction.bids[0];
    const amount = highestBid ? highestBid.amount : auction.starting_bid;
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
              images: auction.item?.image_url ? [auction.item.image_url] : [],
            },
            unit_amount: unitAmountCents,
          },
          quantity: 1,
        },
      ],
      success_url: process.env.FRONTEND_SUCCESS_URL,
      cancel_url: process.env.FRONTEND_CANCEL_URL,
    });

    await prisma.payment.upsert({
      where: { auction_id: auction.id },
      update: {
        amount: amount,
        status: "PENDING",
        stripe_payment_id: session.id,
        user_id: user.id,
      },
      create: {
        amount: amount,
        status: "PENDING",
        stripe_payment_id: session.id,
        auction_id: auction.id,
        user_id: user.id,
      },
    });

    return res.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
};
