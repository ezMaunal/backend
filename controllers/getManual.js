import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

export const getManual = async (req, res, next) => {
  try {
    const { manualId } = req.params;

    const manual = await Manual.findOne({ manualId });
    if (!manual) {
      return next(createError(MESSAGES.ERROR.MANUAL_NOT_FOUND, 404));
    }

    res.json({
      success: true,
      message: MESSAGES.SUCCESS.MANUAL_GET,
      data: {
        manualId: manual.manualId,
        name: manual.name,
        imageCount: manual.steps.length,
        steps: manual.steps,
        createdAt: manual.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
}
