import express from "express";
import { verifyFirebaseToken } from "../middlewares/firebaseAuth.js";
import {
  createItem,
  getAddedItems,
  getListedItems,
  getAllListedItems,
  updateItem,
  deleteItem,
  getPurchasedItems,
  getUnSoldItems,
  getSoldItems,
  getPayableItems,
} from "../controllers/itemsController.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createItem);
router.get("/added", verifyFirebaseToken, getAddedItems);
router.patch("/:id", verifyFirebaseToken, updateItem);
router.delete("/:id", verifyFirebaseToken, deleteItem);

router.get("/listed", verifyFirebaseToken, getListedItems);
router.get("/listed/all", verifyFirebaseToken, getAllListedItems);

router.get("/payable", verifyFirebaseToken, getPayableItems);
router.get("/purchased", verifyFirebaseToken, getPurchasedItems);
router.get("/unsold", verifyFirebaseToken, getUnSoldItems);
router.get("/sold", verifyFirebaseToken, getSoldItems);
export default router;
