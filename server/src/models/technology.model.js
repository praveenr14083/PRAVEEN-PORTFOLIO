import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
    },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "tools"],
      required: true,
    },
  },
  { timestamps: true },
);

export const Technology = mongoose.model("Technology", technologySchema);
