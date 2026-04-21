import express from "express";
import * as eduController from "../controllers/education.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { educationSchema } from "../validators/education.schema.js";

const router = express.Router();

router.post("/", validate(educationSchema), eduController.createEducation);
router.get("/", eduController.getAllEducations);
router.get("/:id", eduController.getEducation);
router.put("/:id", validate(educationSchema), eduController.updateEducation);
router.delete("/:id", eduController.deleteEducation);

export default router;
