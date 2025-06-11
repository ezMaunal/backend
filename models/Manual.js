import mongoose from "mongoose";

const stepSchema = new mongoose.Schema(
  {
    imageId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const manualSchema = new mongoose.Schema(
  {
    manualId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    steps: [stepSchema],
    sharedToken: {
      type: String,
      default: null,
    },
    sharedAt: {
      type: Date,
      default: null,
    },
    shareUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Manual = mongoose.model("Manual", manualSchema);
export default Manual;
