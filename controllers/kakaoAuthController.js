import env from "../config/env.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

export const kakaoLogin = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) {
      return next(createError(MESSAGES.ERROR.AUTH_KAKAO_CODE_MISSING, 404));
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
      return next(createError(MESSAGES.ERROR.AUTH_KAKAO_FAILED, 401));
    }

    const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userData = await userRes.json();

    const kakaoId = userData.id?.toString();
    const nickname = userData.properties?.nickname || `User_${kakaoId}`;
    const profileImage = userData.properties?.profile_image || null;

    const refreshToken = uuidv4();

    let user = await User.findOne({ kakaoId });
    if (!user) {
      const newUserId = uuidv4();
      user = await User.create({
        userId: newUserId,
        kakaoId,
        nickname,
        profileImage,
        kakaoAccessToken: access_token,
        kakaoRefreshToken: refresh_token,
        refreshToken: refreshToken,
      });
    } else {
      user.refreshToken = refreshToken;
      user.kakaoAccessToken = access_token;
      user.kakaoRefreshToken = refresh_token;
      await user.save();
    }

    const jwtAccessToken = jwt.sign(
      { userId: user.userId, kakaoId: user.kakaoId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: MESSAGES.SUCCESS.AUTH_LOGIN,
      token: jwtAccessToken,
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
      return next(createError(MESSAGES.ERROR.AUTH_TOKEN_INVALID, 401));
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return next(createError(MESSAGES.ERROR.AUTH_TOKEN_INVALID, 401));
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

export const kakaoLogout = async (req, res, next) => {
  try {
    const { userId } = req.user;

    await User.updateOne({ userId }, { $unset: { refreshToken: "" }});

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });

    res.json({
      success: true,
      message: MESSAGES.SUCCESS.AUTH_LOGOUT,
    });
  } catch (err) {
    next(err);
  }
};
