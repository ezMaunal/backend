import User from "../models/User.js";
import env from "../config/env.js";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

export const getUserMe = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      return next(createError(MESSAGES.ERROR.USER_NOT_FOUND, 404));
    }

    res.status(200).json({
      message: "OK",
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

export const deleteUserMe = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findOneAndDelete({ userId });
    if (!user) {
      return next(createError(MESSAGES.ERROR.USER_NOT_FOUND, 404));
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });

    res.json({
      success: true,
      message: MESSAGES.SUCCESS.AUTH_DELETE,
    });
  } catch (err) {
    next(err);
  }
};

export const updateHighlightColor = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { highlightColor } = req.body;

    if (!highlightColor || typeof highlightColor !== "string") {
      return next(createError(MESSAGES.ERROR.USER_HIGHLIGHT_COLOR_INVALID, 400));
    }

    const user = await User.findOneAndUpdate(
      { userId },
      { highlightColor },
      { new: true },
    )

    if (!user) {
      return next(createError(MESSAGES.ERROR.USER_NOT_FOUND, 404));
    }

    res.json({
      success: true,
      data: {
        highlightColor: user.highlightColor,
      },
    });
  } catch (err) {
    next(err);
  }
};
