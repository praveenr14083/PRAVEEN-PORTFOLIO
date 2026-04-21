import * as expService from "../services/experience.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createExperience = async (req, res) => {
  try {
    const exp = await expService.createExperience(req.body);
    return successResponse(res, exp, "Experience added", 201);
  } catch (error) {
    return errorResponse(res, "Failed to add experience", 500, error);
  }
};

export const getAllExperiences = async (req, res) => {
  try {
    const data = await expService.getAllExperiences();
    return successResponse(res, data, "Experiences fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch experiences", 500, error);
  }
};

export const getExperience = async (req, res) => {
  try {
    const exp = await expService.getExperienceById(req.params.id);

    if (!exp) {
      return errorResponse(res, "Experience not found", 404);
    }

    return successResponse(res, exp, "Experience fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch experience", 500, error);
  }
};

export const updateExperience = async (req, res) => {
  try {
    const exp = await expService.updateExperience(req.params.id, req.body);

    if (!exp) {
      return errorResponse(res, "Experience not found", 404);
    }

    return successResponse(res, exp, "Experience updated");
  } catch (error) {
    return errorResponse(res, "Failed to update experience", 500, error);
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const exp = await expService.deleteExperience(req.params.id);

    if (!exp) {
      return errorResponse(res, "Experience not found", 404);
    }

    return successResponse(res, null, "Experience deleted");
  } catch (error) {
    return errorResponse(res, "Failed to delete experience", 500, error);
  }
};
