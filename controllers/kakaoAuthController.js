import env from "../config/env.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

export const kakaoLogin = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) {
      const err = new Error("카카오 인가 코드가 없습니다.");
      err.status = 400;

      return next(err);
    }

    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: env.KAKAO_REST_API_KEY,
        redirect_uri: env.KAKAO_REDIRECT_URI,
        code,
      }),
    });

    const tokenData = await tokenRes.json();
    const { access_token, refresh_token } = tokenData;
    if (!access_token) {
      const err = new Error("카카오 로그인 인증에 실패했습니다.");
      err.status = 401;

      return next(err);
    }

    const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userData = await userRes.json();

    const kakaoId = userData.id?.toString();
    const nickname = userData.properties?.nickname || `User_${kakaoId}`;
    const profileImage = userData.properties?.profile_image || null;

    let user = await User.findOne({ kakaoId });
    if (!user) {
      user = await User.create({
        userId: uuidv4(),
        kakaoId,
        nickname,
        profileImage,
        refreshToken: refresh_token,
      });
    } else {
      user.refreshToken = refresh_token;
      await user.save();
    }

    const accessToken = jwt.sign(
      { userId: user.userId, kakaoId: user.kakaoId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production", // 배포 시 true
      sameSite: "Lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "로그인 성공 및 회원가입이 완료되었습니다.",
      token: accessToken,
      user: {
        userId: user.userId,
        nickname: user.nickname,
        profileImage: user.profileImage,
        highlightColor: user.highlightColor,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const err = new Error("유효하지 않거나 만료된 토큰입니다.");
      err.status = 401;

      return next(err);
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      const err = new Error("유효하지 않거나 만료된 토큰입니다.");
      err.status = 401;

      return next(err);
    }

    const newAccessToken = jwt.sign(
      { userId: user.userId, kakaoId: user.kakaoId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    next(err);
  }
};
