import express from "express";
import {
  kakaoLogin,
  refreshToken,
  kakaoLogout,
} from "../controllers/kakaoAuthController.js";

import { kakaoRedirectLogin } from "../controllers/kakaoRedirectLogin.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/kakao/callback", kakaoRedirectLogin);
router.post("/kakao/login", kakaoLogin);
router.post("/kakao/refresh", refreshToken);
router.post("/kakao/logout", verifyToken, kakaoLogout);

export default router;
