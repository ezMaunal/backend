import express from "express";
import { createManual } from "../controllers/createManual.js";
import upload from "../config/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/manual", verifyToken, upload.array("image"), createManual);

export default router;
