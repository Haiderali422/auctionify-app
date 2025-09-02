import { Worker } from "bullmq";
import connection from "../config/redis.js";
import prisma from "../config/db.js";

const auctionWorker = new Worker(
  "auctionQueue",
  async (job) => {
    if (job.name === "endAuction") {
      const { auctionId } = job.data;

      console.log(`Processing auction end for auctionId: ${auctionId}`);

      const auction = await prisma.auction.findUnique({
        where: { id: auctionId },
        include: { item: true },
      });

      if (!auction) {
        console.log(`Auction ${auctionId} not found`);
        return;
      }

      // For now (skeleton logic Day-5/6), just log
      console.log(
        `Auction ended for item_id: ${auction.item_id}, item title: ${auction.item.title}`
      );

      // Closing logic (mark is_closed, find winner, payment flow) - Day-7 & Day-8
    }
  },
  { connection }
);

auctionWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

auctionWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

export default auctionWorker;
