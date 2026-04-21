import * as skillService from "../services/skill.service.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const createSkill = async (req, res) => {
  try {
    const skill = await skillService.createSkill(req.body);
    return successResponse(res, skill, "Skill created", 201);
  } catch (error) {
    return errorResponse(res, "Failed to create skill", 500, error);
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await skillService.getAllSkills();
    return successResponse(res, skills, "Skills fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch skills", 500, error);
  }
};

export const getSkill = async (req, res) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);

    if (!skill) {
      return errorResponse(res, "Skill not found", 404);
    }

    return successResponse(res, skill, "Skill fetched");
  } catch (error) {
    return errorResponse(res, "Failed to fetch skill", 500, error);
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await skillService.updateSkill(req.params.id, req.body);

    if (!skill) {
      return errorResponse(res, "Skill not found", 404);
    }

    return successResponse(res, skill, "Skill updated");
  } catch (error) {
    return errorResponse(res, "Failed to update skill", 500, error);
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await skillService.deleteSkill(req.params.id);

    if (!skill) {
      return errorResponse(res, "Skill not found", 404);
    }

    return successResponse(res, null, "Skill deleted");
  } catch (error) {
    return errorResponse(res, "Failed to delete skill", 500, error);
  }
};
