import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

export const updateStepText = async (req, res, next) => {
  try {
    const { manualId, imageId } = req.params;
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return next(createError(MESSAGES.ERROR.STEP_TEXT_INVALID, 400));
    }

    const manual = await Manual.findOne({ manualId });
    if (!manual) {
      return next(createError(MESSAGES.ERROR.MANUAL_NOT_FOUND, 404));
    }

    const step = manual.steps.find((step) => step.imageId === imageId);
    if (!step) {
      return next(createError(MESSAGES.ERROR.STEP_IMAGE_NOT_FOUND, 404));
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
