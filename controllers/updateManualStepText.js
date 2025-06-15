import Manual from "../models/Manual.js";

export const updateStepText = async (req, res, next) => {
  try {
    const { manualId, imageId } = req.params;
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      const err = new Error("수정할 텍스트가 유효하지 않습니다.");
      err.status = 400;

      return next(err);
    }

    const manual = await Manual.findOne({ manualId });
    if (!manual) {
      const err = new Error("해당 manualId에 대한 매뉴얼이 존재하지 않습니다.");
      err.status = 404;

      return next(err);
    }

    const step = manual.steps.find((step) => step.imageId === imageId);
    if (!step) {
      const err = new Error("해당 imageId에 대한 이미지가 존재하지 않습니다.");
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
