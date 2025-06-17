import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";

export const updateStepText = async (req, res, next) => {
  try {
    const { manualId, imageId } = req.params;
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      const err = new Error(MESSAGES.ERROR.STEP_TEXT_INVALID);
      err.status = 400;

      return next(err);
    }

    const manual = await Manual.findOne({ manualId });
    if (!manual) {
      const err = new Error(MESSAGES.ERROR.MANUAL_NOT_FOUND);
      err.status = 404;

      return next(err);
    }

    const step = manual.steps.find((step) => step.imageId === imageId);
    if (!step) {
      const err = new Error(MESSAGES.ERROR.STEP_IMAGE_NOT_FOUND);
      err.status = 404;

      return next(err);
    }

    step.text = text;
    await manual.save();

    res.json({
      success: true,
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
};
