import Manual from "../models/Manual.js";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { MESSAGES } from "../config/constants.js";
import { createError } from "../utils/createError.js";

export const createManual = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!req.files || req.files.length === 0) {
      return next(createError(MESSAGES.ERROR.FILE_REQUIRED, 400));
    }

    let texts = req.body.text;
    if (!texts) {
      return next(createError(MESSAGES.ERROR.STEP_TEXT_REQUIRED, 400));
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
