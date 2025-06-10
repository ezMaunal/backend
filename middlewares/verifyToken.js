import env from "../config/env.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("인증 정보가 유효하지 않습니다.");
    err.status = 401;

    return next(err);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    err.status = 401;
    err.message = "인증 정보가 유효하지 않습니다.";
    next(err);
  }
};
