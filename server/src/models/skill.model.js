import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: "code", // lucide icon name
    },
    technologies: [
      {
        type: String, // 👈 storing text instead of ObjectId
        trim: true,
      },
    ],
  },
  { timestamps: true },
);

export const Skill = mongoose.model("Skill", skillSchema);
