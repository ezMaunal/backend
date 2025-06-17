import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";
import { verifyAccessToken } from "../utils/jwtUtil.js";


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(MESSAGES.ERROR.AUTH_UNAUTHORIZED, 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};
