import express from "express";
import { createManual } from "../controllers/createManual.js";
import upload from "../config/multer.js";
import { updateManualName } from "../controllers/updateManualName.js";
import { deleteManual } from "../controllers/deleteManual.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/manual", verifyToken, upload.array("image"), createManual);
router.patch("/manual/:manualId", updateManualName);
router.delete("/manual/:manualId", deleteManual);

export default router;
