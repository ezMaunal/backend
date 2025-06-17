import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

export const updateManualName = async (req, res, next) => {
  try {
    const { manualId } = req.params;
    const { name } = req.body;

    if (!name) {
      return next(createError(MESSAGES.ERROR.MANUAL_NAME_REQUIRED, 400));
    }

    const manual = await Manual.findOneAndUpdate(
      { manualId },
      { name },
      { new: true },
    );

    if (!manual) {
      return next(createError(MESSAGES.ERROR.MANUAL_NOT_FOUND, 404));
    }

    res.json({
      success: true,
      manualId: manual.manualId,
      name: manual.name,
    });
  } catch (err) {
    next(err);
  }
};
