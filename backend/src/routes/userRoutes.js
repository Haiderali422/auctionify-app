import express from "express";
import { verifyFirebaseToken } from "../middlewares/firebaseAuth.js";
import { saveUserProfile } from "../controllers/userController.js";
import { updateUserProfile } from "../controllers/userController.js";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/save-profile", verifyFirebaseToken, saveUserProfile);

router.get("/me", verifyFirebaseToken, getUserProfile);

router.patch("/me", verifyFirebaseToken, updateUserProfile);

export default router;
