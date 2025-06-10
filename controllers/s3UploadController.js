export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "파일이 업로드되지 않았습니다." });
  }

  res.status(200).json({
    message: "파일 업로드가 완료되었습니다.",
    imageUrl: req.file.location,
  });
};
