import express from "express";
import stripe from "../config/stripe.js";
import prisma from "../config/db.js";
import { PaymentStatus } from "@prisma/client";

const router = express.Router();

router.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object;
          const auctionId = parseInt(session.metadata.auctionId, 10);

          await prisma.payment.update({
            where: { stripePaymentId: session.id },
            data: { status: PaymentStatus.SUCCESS },
          });

          console.log("Payment success for auction:", auctionId);
          break;
        }

        case "checkout.session.expired":
        case "checkout.session.async_payment_failed":
        case "payment_intent.payment_failed": {
          const session = event.data.object;

          await prisma.payment.update({
            where: { stripePaymentId: session.id },
            data: { status: PaymentStatus.FAILED },
          });

          console.log("Payment failed:", session.id);
          break;
        }

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Webhook processing error:", err);
      res.status(500).send("Internal webhook error");
    }
  }
);

export default router;
