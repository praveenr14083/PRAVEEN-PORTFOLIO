import express from "express";
import cors from "cors";
import morgan from "morgan";

import projectRoutes from "./routes/project.routes.js";
import technologyRoutes from "./routes/technology.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import statsRoutes from "./routes/stats.routes.js";

import { errorMiddleware } from "./middleware/error.middleware.js";
import { verifyAdmin } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health
app.get("/", (req, res) => {
  res.json({ success: true, message: "API running 🚀" });
});

// protect all API routes (except maybe login if there was one, but Firebase handles login client-side)
app.use("/api", verifyAdmin);

// routes
app.use("/api/stats", statsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// error
app.use(errorMiddleware);

export default app;
