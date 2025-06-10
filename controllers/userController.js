import User from "../models/User.js";

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
