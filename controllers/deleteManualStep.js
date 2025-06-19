import Manual from "../models/Manual.js";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

export const deleteStepFromManual = async (req, res, next) => {
  try {
    const { manualId, imageId } = req.params;

    const manual = await Manual.findOne({ manualId });
    if (!manual) {
      return next(createError(MESSAGES.ERROR.MANUAL_NOT_FOUND, 404));
    }

    const updatedSteps = manual.steps.filter(
      (step) => step.imageId !== imageId,
    );
    manual.steps = updatedSteps;
    await manual.save();

    res.json({
      deleted: true,
      manualId,
      imageId,
      message: MESSAGES.SUCCESS.STEP_DELETE || "스텝 삭제 성공",
    });
  } catch (err) {
    next(err);
  }
};
