import express from "express";
import cors from "cors";
import morgan from "morgan";

import projectRoutes from "./routes/project.routes.js";
import technologyRoutes from "./routes/technology.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";

import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health
app.get("/", (req, res) => {
  res.json({ success: true, message: "API running 🚀" });
});

// routes
app.use("/api/projects", projectRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certificates", certificateRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// error
app.use(errorMiddleware);

export default app;
