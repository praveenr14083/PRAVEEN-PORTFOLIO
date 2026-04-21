import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    file: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

export const Resume = mongoose.model("Resume", resumeSchema);
