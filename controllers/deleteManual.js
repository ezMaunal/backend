import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";

export const deleteManual = async (req, res, next) => {
  try {
    const { manualId } = req.params;

    const manual = await Manual.findOne({ manualId });

    if (!manual) {
      const err = new Error(MESSAGES.ERROR.MANUAL_NOT_FOUND);
      err.status = 404;

      return next(err);
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
