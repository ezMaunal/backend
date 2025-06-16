import Manual from "../models/Manual.js";

export const getManualList = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const manuals = await Manual.find({ userId }).sort({ createdAt: -1 });

    const manualList = manuals.map((manual, index) => ({
      index: index + 1,
      manualId: manual.manualId,
      name: manual.name,
      imageCount: manual.steps.length,
      thumbnail: manual.steps[0]?.url || null,
      createdAt: manual.createdAt,
    }));

    res.json({
      success: true,
      data: manualList,
    })
  } catch (err) {
    next(err);
  }
};
