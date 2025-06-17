import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";

export const updateManualName = async (req, res, next) => {
  try {
    const { manualId } = req.params;
    const { name } = req.body;

    if (!name) {
      const err = new Error(MESSAGES.ERROR.MANUAL_NAME_REQUIRED);
      err.status = 400;

      return next(err);
    }

    const manual = await Manual.findOneAndUpdate(
      { manualId },
      { name },
      { new: true },
    );

    if (!manual) {
      const err = new Error(MESSAGES.ERROR.MANUAL_NOT_FOUND);
      err.status = 404;

      return next(err);
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
