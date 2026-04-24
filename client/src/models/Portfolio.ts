import mongoose from "mongoose";

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    technologies: [{ type: String }],
    category: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
    liveUrl: String,
    githubUrl: String,
    image: { url: String, public_id: String },
  },
  { timestamps: true }
);

// Resume Schema
const resumeSchema = new mongoose.Schema(
  {
    file: { url: String, public_id: String },
  },
  { timestamps: true }
);

// Skill Schema
const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String, default: "code" },
    technologies: [{ type: String }],
  },
  { timestamps: true }
);

// Education Schema
const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institute: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    grade: { type: String },
    gradeType: { type: String, enum: ["CGPA", "Percentage", "GPA"] },
  },
  { timestamps: true }
);

// Experience Schema
const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    employmentType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract", "Freelance"] },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Technology Schema
const technologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { url: String, public_id: String },
    category: { type: String, enum: ["frontend", "backend", "database", "tools"] },
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);
export const Education = mongoose.models.Education || mongoose.model("Education", educationSchema);
export const Experience = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
export const Technology = mongoose.models.Technology || mongoose.model("Technology", technologySchema);
