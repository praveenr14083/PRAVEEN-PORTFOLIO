import * as resumeService from "../services/resume.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import logger from "../utils/logger.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, "PDF file is required", 400);
    }

    // Cloudinary returns path & filename
    // The filename from multer-storage-cloudinary includes the folder prefix
    const fileData = {
      url: req.file.path,
      public_id: req.file.filename, // This includes 'portfolio_resumes/...'
    };

    logger.debug("Resume Controller: Uploading file to Cloudinary: %o", fileData);

    const resume = await resumeService.uploadResume(fileData);

    return successResponse(res, resume, "Resume uploaded successfully");
  } catch (error) {
    logger.error(`Resume Controller: Upload error — ${error.message}`, { stack: error.stack });
    return errorResponse(res, error.message || "Upload failed", 500);
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await resumeService.getResume();

    if (!resume) {
      return errorResponse(res, "Resume not found", 404);
    }

    return successResponse(res, resume, "Resume fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch resume", 500);
  }
};

export const deleteResume = async (req, res) => {
  try {
    const result = await resumeService.deleteResume();

    if (!result) {
      return errorResponse(res, "Resume not found", 404);
    }

    return successResponse(res, null, "Resume deleted successfully");
  } catch (error) {
    logger.error(`Resume Controller: Delete error — ${error.message}`, { stack: error.stack });
    return errorResponse(res, error.message || "Failed to delete resume", 500);
  }
};
