import express from "express";
import cors from "cors";
import uploadRouter from "./routes/s3Upload.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import errorHandler from "./middlewares/errorHandler.js";
import manualRoutes from "./routes/manual.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", uploadRouter);
app.use("/api", manualRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
