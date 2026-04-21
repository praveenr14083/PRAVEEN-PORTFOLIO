import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
