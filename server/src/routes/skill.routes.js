import express from "express";
import * as skillController from "../controllers/skill.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { skillSchema } from "../validators/skill.schema.js";

const router = express.Router();

router.post("/", validate(skillSchema), skillController.createSkill);
router.get("/", skillController.getAllSkills);
router.get("/:id", skillController.getSkill);
router.put("/:id", validate(skillSchema), skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill);

export default router;
