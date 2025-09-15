import express from "express";
import { verifyFirebaseToken } from "../middlewares/firebaseAuth.js";
import {
  createItem,
  getAddedItems,
  getListedItems,
  getAllListedItems,
  updateItem,
  deleteItem,
} from "../controllers/itemsController.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createItem);
router.get("/added", verifyFirebaseToken, getAddedItems);;
router.patch("/:id", verifyFirebaseToken, updateItem);
router.delete("/:id", verifyFirebaseToken, deleteItem);

router.get("/listed", verifyFirebaseToken, getListedItems);
router.get("/listed/all", verifyFirebaseToken, getAllListedItems);
export default router;
