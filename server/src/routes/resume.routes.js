import express from "express";
import * as resumeController from "../controllers/resume.controller.js";
import { uploadTo } from "../middleware/upload.middleware.js";

const router = express.Router();

// Only PDF (handled in middleware)
router.post(
  "/",
  uploadTo("resumes").single("file"),
  resumeController.uploadResume,
);

router.get("/", resumeController.getResume);

router.delete("/", resumeController.deleteResume);

export default router;
