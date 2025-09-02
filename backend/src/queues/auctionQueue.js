import { Queue } from "bullmq";
import connection from "../config/redis.js";
export const auctionQueue = new Queue("auctionQueue", { connection });
