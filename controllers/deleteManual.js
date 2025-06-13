import Manual from "../models/Manual.js";

export const deleteManual = async (req, res, next) => {
  try {
    const { manualId } = req.params;

    const manual = await Manual.findOneAndDelete({ manualId });

    if (!manual) {
      const err = new Error("해당 매뉴얼을 찾을 수 없습니다.");
      err.status = 404;

      return next(err);
    }

    await Manual.deleteOne({ manualId });

    res.json({
      deleted: true,
      manualId,
      message: "해당 매뉴얼이 삭제되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};
