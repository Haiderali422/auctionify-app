import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("Connected to Redis");
});

connection.on("error", (err) => {
  console.error("Redis error:", err);
});

export default connection;
