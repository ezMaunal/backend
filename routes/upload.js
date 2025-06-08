import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "Upload successful",
    imageUrl: req.file.location,
  });
});

export default router;
