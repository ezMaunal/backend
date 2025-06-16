import Manual from "../models/Manual.js";

export const getManual = async (req, res, next) => {
  try {
    const { manualId } = req.params;

    const manual = await Manual.findOne({ manualId });
    if (!manual) {
      const err = new Error("해당 manualId에 대한 매뉴얼이 존재하지 않습니다.");
      err.status = 404;

      return next(err);
    }

    res.json({
      success: true,
      message: "매뉴얼을 성공적으로 조회했습니다.",
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
