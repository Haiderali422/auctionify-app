import { Worker } from "bullmq";
import connection from "../config/redis.js";
import prisma from "../config/db.js";

const auctionWorker = new Worker(
  "auctionQueue",
  async (job) => {
    if (job.name === "endAuction") {
      const { auctionId } = job.data;

      console.log(
        `[AuctionWorker] Processing auction end for ID: ${auctionId}`
      );

      try {
        const auction = await prisma.auction.findUnique({
          where: { id: auctionId },
          include: {
            item: true,
            bids: { orderBy: { amount: "desc" }, take: 1 },
          },
        });

        if (!auction) {
          console.warn(`[AuctionWorker] Auction ${auctionId} not found`);
          return { success: false, message: `Auction ${auctionId} not found` };
        }

        if (auction.isClosed) {
          console.log(`[AuctionWorker] Auction ${auctionId} already closed`);
          return {
            success: true,
            message: `Auction ${auctionId} already closed`,
          };
        }

        let winnerUid = null;
        if (auction.bids.length > 0) {
          winnerUid = auction.bids[0].userUid;
        }

        const updatedAuction = await prisma.auction.update({
          where: { id: auctionId },
          data: {
            isClosed: true,
            winnerUid,
          },
        });

        console.log(
          `[AuctionWorker] Auction closed (ID: ${auctionId}) → ${
            winnerUid ? `Winner: ${winnerUid}` : "No bids (unsold)"
          }`
        );

        return {
          success: true,
          message: winnerUid
            ? `Auction ${auctionId} closed successfully. Winner assigned.`
            : `Auction ${auctionId} closed with no bids (unsold).`,
          data: updatedAuction,
        };
      } catch (error) {
        console.error(
          `[AuctionWorker] Error closing auction ${auctionId}:`,
          error
        );
        return {
          success: false,
          message: "Failed to close auction",
          error: error.message,
        };
      }
    }
  },
  { connection }
);

auctionWorker.on("completed", (job) => {
  console.log(`[AuctionWorker] Job ${job.id} completed`);
});

auctionWorker.on("failed", (job, err) => {
  console.error(`[AuctionWorker] Job ${job.id} failed:`, err);
});

export default auctionWorker;
