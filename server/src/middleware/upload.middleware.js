import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

export const uploadTo = (folderName) => {
  const isResume = folderName === "resumes";
  const isTech = folderName === "technologies";

  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: `portfolio_${folderName}`,

        // ✅ Strict type control
        resource_type: isResume ? "raw" : "image",

        // ✅ Allowed formats
        format: file.mimetype.split("/")[1],

        public_id: `${Date.now()}-${file.originalname
          .split(".")[0]
          .replace(/\s+/g, "-")}`,
      };
    },
  });

  return multer({
    storage,

    // ✅ File validation
    fileFilter: (req, file, cb) => {
      if (isResume) {
        // 🔥 ONLY PDF
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Only PDF files are allowed for resume"), false);
        }
      } else if (isTech) {
        // 🔥 Only icons/images
        if (
          [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
            "image/svg+xml",
            "image/x-icon",
            "image/gif",
          ].includes(file.mimetype)
        ) {
          cb(null, true);
        } else {
          cb(new Error("Only image files allowed for technologies"), false);
        }
      } else {
        // 🔥 Certificates / Projects (image + pdf optional)
        if (
          file.mimetype.startsWith("image/") ||
          file.mimetype === "application/pdf"
        ) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type"), false);
        }
      }
    },

    // ✅ File size limit (important)
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });
};
