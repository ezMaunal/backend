import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

export const deleteManual = async (req, res, next) => {
  try {
    const { manualId } = req.params;

    const manual = await Manual.findOne({ manualId });
    if (!manual) {
      return next(createError(MESSAGES.ERROR.MANUAL_NOT_FOUND, 404));
    }

    await Manual.deleteOne({ manualId });

    res.json({
      deleted: true,
      manualId,
      message: MESSAGES.SUCCESS.MANUAL_DELETE,
    });
  } catch (err) {
    next(err);
  }
};
