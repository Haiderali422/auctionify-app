import "dotenv/config";
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/healthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import "./workers/auctionWorker.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/users", userRoutes);
app.use("/users/items", itemRoutes);
app.use("/auctions", auctionRoutes);
app.use("/auctions", bidRoutes);
app.use("/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Auctionify API is running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
