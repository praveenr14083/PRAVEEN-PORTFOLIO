import * as techService from "../services/technology.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createTechnology = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      icon: req.file
        ? { url: req.file.path, public_id: req.file.filename }
        : undefined,
    };
    const tech = await techService.createTechnology(data);
    return successResponse(res, tech, "Technology created", 201);
  } catch (error) {
    return errorResponse(res, "Failed to create technology", 500, error);
  }
};

export const getAllTechnologies = async (req, res, next) => {
  try {
    const techs = await techService.getAllTechnologies();
    return successResponse(res, techs, "Technologies fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch technologies", 500, error);
  }
};

export const getTechnology = async (req, res, next) => {
  try {
    const tech = await techService.getTechnologyById(req.params.id);

    if (!tech) {
      return errorResponse(res, "Technology not found", 404);
    }

    return successResponse(res, tech, "Technology fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch technology", 500, error);
  }
};

export const updateTechnology = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      ...(req.file && {
        icon: { url: req.file.path, public_id: req.file.filename },
      }),
    };
    const tech = await techService.updateTechnology(req.params.id, data);

    if (!tech) {
      return errorResponse(res, "Technology not found", 404);
    }

    return successResponse(res, tech, "Technology updated");
  } catch (error) {
    return errorResponse(res, "Failed to update technology", 500, error);
  }
};

export const deleteTechnology = async (req, res, next) => {
  try {
    const tech = await techService.deleteTechnology(req.params.id);

    if (!tech) {
      return errorResponse(res, "Technology not found", 404);
    }

    return successResponse(res, null, "Technology deleted");
  } catch (error) {
    return errorResponse(res, "Failed to delete technology", 500, error);
  }
};
