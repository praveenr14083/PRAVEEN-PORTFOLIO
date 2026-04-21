import express from "express";
import * as certController from "../controllers/certificate.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { certificateSchema } from "../validators/certificate.schema.js";
import { uploadTo } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  uploadTo("certificates").single("image"),
  validate(certificateSchema),
  certController.createCertificate,
);

router.get("/", certController.getAllCertificates);

router.get("/:id", certController.getCertificate);

router.put(
  "/:id",
  uploadTo("certificates").single("image"),
  validate(certificateSchema),
  certController.updateCertificate,
);

router.delete("/:id", certController.deleteCertificate);

export default router;
