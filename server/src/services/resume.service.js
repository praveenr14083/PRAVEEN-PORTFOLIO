import { Resume } from "../models/resume.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import logger from "../utils/logger.js";

// Upload or Replace Resume
export const uploadResume = async (fileData) => {
  const existing = await Resume.findOne();

  if (existing) {
    if (existing.file?.public_id) {
      await deleteFromCloudinary(existing.file.public_id, "raw"); // ✅ FIX
    }

    existing.file = fileData;
    return await existing.save();
  }

  return await Resume.create({ file: fileData });
};

// Get Resume
export const getResume = async () => {
  return await Resume.findOne();
};

// Delete Resume
export const deleteResume = async () => {
  const resume = await Resume.findOne();

  if (!resume) {
    logger.warn("Resume Service: No resume found to delete");
    return null;
  }

  if (resume.file?.public_id) {
    logger.debug(`Resume Service: Deleting from Cloudinary [${resume.file.public_id}]`);

    try {
      await deleteFromCloudinary(resume.file.public_id, "raw"); // ✅ FIX
    } catch (err) {
      logger.error(`Resume Service: Cloudinary deletion failed — ${err.message}`);
      throw err;
    }
  }

  await Resume.deleteOne({ _id: resume._id });

  return true;
};
