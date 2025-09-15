import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ Status: "ok", time: new Date().toISOString() });
});

export default router;
