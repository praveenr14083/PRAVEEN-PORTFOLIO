import express from "express";
import * as techController from "../controllers/technology.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { technologySchema } from "../validators/technology.schema.js";
import { uploadTo } from "../middleware/upload.middleware.js";

const router = express.Router();
const upload = uploadTo("technologies");

router.post(
  "/",
  upload.single("icon"),
  validate(technologySchema),
  techController.createTechnology,
);
router.get("/", techController.getAllTechnologies);
router.get("/:id", techController.getTechnology);
router.put(
  "/:id",
  upload.single("icon"),
  validate(technologySchema),
  techController.updateTechnology,
);
router.delete("/:id", techController.deleteTechnology);

export default router;
