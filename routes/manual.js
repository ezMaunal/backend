import express from "express";
import { createManual } from "../controllers/createManual.js";
import { updateManualName } from "../controllers/updateManualName.js";
import upload from "../config/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { deleteManual } from "../controllers/deleteManual.js";
import { updateStepText } from "../controllers/updateManualStepText.js";

const router = express.Router();

router.post("/manual", verifyToken, upload.array("image"), createManual);
router.patch("/manual/:manualId", updateManualName);
router.delete("/manual/:manualId", deleteManual);
router.patch("/manual/:manualId/images/:imageId", updateStepText);

export default router;
