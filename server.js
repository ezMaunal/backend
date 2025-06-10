import env from "./config/env.js";
import mongoose from "mongoose";
import app from "./app.js";

mongoose
  .connect(env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Atlas 연결 성공");
  })
  .catch((err) => {
    console.error("MongoDB 연결 에러:", err);
  });

const PORT = env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
