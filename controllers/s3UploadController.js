import { MESSAGES } from "../config/constants.js";

export const uploadImage = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: MESSAGES.ERROR.FILE_REQUIRED });
  }

  const uploadedImageUrls = req.files.map((file) => file.location);

  res.json({
    message: MESSAGES.SUCCESS.IMAGE_UPLOAD,
    imageUrl: uploadedImageUrls,
  });
};
