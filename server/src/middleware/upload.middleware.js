import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

export const uploadTo = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `portfolio_${folderName}`,
      resource_type: "auto", // 🔥 important for PDF
      allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
      public_id: (req, file) =>
        `${Date.now()}-${file.originalname.split(".")[0]}`,
    },
  });

  return multer({ storage });
};
