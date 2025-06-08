import env from "./config/env.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import uploadRouter from "./routes/upload.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", uploadRouter);

mongoose
  .connect(env.MONGODB_Atlas_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas 연결 성공");
  })
  .catch((err) => {
    console.error("❌ MongoDB 연결 에러:", err);
  });

const PORT = env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
