import express from "express";
import { getUserMe } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/me", verifyToken, getUserMe);

export default router;
