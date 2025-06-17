import { MESSAGES } from "../config/constants.js";

export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
  });
}
