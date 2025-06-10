export const uploadImage = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "파일이 업로드되지 않았습니다." });
  }

  const uploadedImageUrls = req.files.map((file) => file.location);

  res.status(200).json({
    message: "이미지 업로드가 완료되었습니다.",
    imageUrl: uploadedImageUrls,
  });
};
