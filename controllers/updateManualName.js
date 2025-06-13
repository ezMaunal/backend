import Manual from "../models/Manual.js";

export const updateManualName = async (req, res, next) => {
  try {
    const { manualId } = req.params;
    const { name } = req.body;

    if (!name) {
      const err = new Error("수정할 제목이 없습니다.");
      err.status = 400;

      return next(err);
    }

    const manual = await Manual.findOneAndUpdate(
      { manualId },
      { name },
      { new: true },
    );

    if (!manual) {
      const err = new Error("해당 manualId에 대한 매뉴얼이 존재하지 않습니다.");
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
