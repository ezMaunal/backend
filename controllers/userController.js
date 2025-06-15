import User from "../models/User.js";
import env from "../config/env.js";

export const getUserMe = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ userId });

    if (!user) {
      const err = new Error("사용자 정보를 찾을 수 없습니다.");
      err.status = 404;
      return next(err);
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
      const err = new Error("사용자 정보를 찾을 수 없습니다.");
      err.status = 404;

      return next(err);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });

    res.json({
      success: true,
      message: "회원 탈퇴가 완료되었습니다."
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
      const err = new Error("highlightColor 값이 유효하지 않습니다.");
      err.status = 400;

      return next(err);
    }

    const user = await User.findOneAndUpdate(
      { userId },
      { highlightColor },
      { new: true },
    )

    if (!user) {
      const err = new Error("사용자 정보를 찾을 수 없습니다.");
      err.status = 404;

      return next(err);
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
