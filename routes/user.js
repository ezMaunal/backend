import express from "express";
import { getUserMe, deleteUserMe } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/me", verifyToken, getUserMe);
router.delete("/me", verifyToken, deleteUserMe);

export default router;
