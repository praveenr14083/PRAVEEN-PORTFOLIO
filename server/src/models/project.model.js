import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    technologies: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: [
        "Web Development",
        "Mobile App",
        "UI/UX Design",
        "Backend",
        "Full Stack",
        "Other",
      ],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    liveUrl: String,
    githubUrl: String,
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Project", projectSchema);
