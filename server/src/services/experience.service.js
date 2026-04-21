import { Experience } from "../models/experience.model.js";

export const createExperience = (data) => Experience.create(data);

export const getAllExperiences = () =>
  Experience.find().sort({ startDate: -1 });

export const getExperienceById = (id) => Experience.findById(id);

export const updateExperience = (id, data) =>
  Experience.findByIdAndUpdate(id, data, { new: true });

export const deleteExperience = (id) => Experience.findByIdAndDelete(id);
