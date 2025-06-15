import express from "express";
import {
  getUserMe,
  deleteUserMe,
  updateHighlightColor,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/me", verifyToken, getUserMe);
router.delete("/me", verifyToken, deleteUserMe);
router.patch("/me", verifyToken, updateHighlightColor);

export default router;
