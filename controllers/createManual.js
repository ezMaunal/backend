import Manual from "../models/Manual.js";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const createManual = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!req.files || req.files.length === 0) {
      const err = new Error("파일이 업로드되지 않았습니다.");
      err.status = 400;

      return next(err);
    }

    let texts = req.body.text;
    if (!texts) {
      const err = new Error("단계별 안내 텍스트가 비어 있습니다.");
      err.status = 400;

      return next(err);
    }
    if (!Array.isArray(texts)) texts = [texts];

    const today = dayjs().format("YYYYMMDD");
    const existingManuals = await Manual.find({
      userId,
      name: new RegExp(`^${today}`),
    }).sort({ name: 1 });
    const name =
      existingManuals.length > 0 ? `${today}-${existingManuals.length}` : today;

    const steps = req.files.map((file, index) => ({
      imageId: `img_${(index + 1).toString().padStart(3, "0")}`,
      text: texts[index],
      url: file.location,
    }));

    const manualId = `mnl_${uuidv4().slice(0, 8)}`;

    const manual = await Manual.create({
      manualId,
      userId,
      name,
      steps,
    });

    res.status(201).json({
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
