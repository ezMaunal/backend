import express from "express";
import {
  kakaoLogin,
  refreshToken,
} from "../controllers/kakaoAuthController.js";

const router = express.Router();

router.post("/kakao/login", kakaoLogin);
router.post("/kakao/refresh", refreshToken);

export default router;
