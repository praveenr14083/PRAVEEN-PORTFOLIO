import { Skill } from "../models/skill.model.js";

export const createSkill = (data) => Skill.create(data);

export const getAllSkills = () => Skill.find().sort({ createdAt: -1 });

export const getSkillById = (id) => Skill.findById(id);

export const updateSkill = (id, data) =>
  Skill.findByIdAndUpdate(id, data, { new: true });

export const deleteSkill = (id) => Skill.findByIdAndDelete(id);
