import * as eduService from "../services/education.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createEducation = async (req, res) => {
  try {
    const edu = await eduService.createEducation(req.body);
    return successResponse(res, edu, "Education added", 201);
  } catch (error) {
    return errorResponse(res, "Failed to add education", 500, error);
  }
};

export const getAllEducations = async (req, res) => {
  try {
    const data = await eduService.getAllEducations();
    return successResponse(res, data, "Education fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch education", 500, error);
  }
};

export const getEducation = async (req, res) => {
  try {
    const edu = await eduService.getEducationById(req.params.id);

    if (!edu) {
      return errorResponse(res, "Education not found", 404);
    }

    return successResponse(res, edu, "Education fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch education", 500, error);
  }
};

export const updateEducation = async (req, res) => {
  try {
    const edu = await eduService.updateEducation(req.params.id, req.body);

    if (!edu) {
      return errorResponse(res, "Education not found", 404);
    }

    return successResponse(res, edu, "Education updated");
  } catch (error) {
    return errorResponse(res, "Failed to update education", 500, error);
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const edu = await eduService.deleteEducation(req.params.id);

    if (!edu) {
      return errorResponse(res, "Education not found", 404);
    }

    return successResponse(res, null, "Education deleted");
  } catch (error) {
    return errorResponse(res, "Failed to delete education", 500, error);
  }
};
