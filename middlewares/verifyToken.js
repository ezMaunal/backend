import env from "../config/env.js";
import jwt from "jsonwebtoken";
import { MESSAGES } from "../config/constants.js";

const JWT_SECRET = env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error(MESSAGES.ERROR.AUTH_UNAUTHORIZED);
    err.status = 401;

    return next(err);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};
