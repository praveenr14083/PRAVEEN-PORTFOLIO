import express from "express";
import * as projectController from "../controllers/project.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { projectSchema } from "../validators/project.schema.js";
import { uploadTo } from "../middleware/upload.middleware.js";

const router = express.Router();
const upload = uploadTo("projects");

router.post(
  "/",
  upload.single("image"),
  validate(projectSchema),
  projectController.createProject,
);

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);

router.put(
  "/:id",
  upload.single("image"),
  validate(projectSchema),
  projectController.updateProject,
);

router.delete("/:id", projectController.deleteProject);

export default router;
