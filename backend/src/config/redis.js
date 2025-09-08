import { Redis } from "ioredis";

const connection = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("Connected to Redis");
});

connection.on("error", (err) => {
  console.error("Redis error:", err);
});

export default connection;
