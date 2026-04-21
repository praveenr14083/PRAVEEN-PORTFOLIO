import express from "express";
import * as expController from "../controllers/experience.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { experienceSchema } from "../validators/experience.schema.js";

const router = express.Router();

router.post("/", validate(experienceSchema), expController.createExperience);
router.get("/", expController.getAllExperiences);
router.get("/:id", expController.getExperience);
router.put("/:id", validate(experienceSchema), expController.updateExperience);
router.delete("/:id", expController.deleteExperience);

export default router;
