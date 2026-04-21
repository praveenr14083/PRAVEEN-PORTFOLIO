import { Education } from "../models/education.model.js";

export const createEducation = (data) => Education.create(data);

export const getAllEducations = () => Education.find().sort({ startDate: -1 });

export const getEducationById = (id) => Education.findById(id);

export const updateEducation = (id, data) =>
  Education.findByIdAndUpdate(id, data, { new: true });

export const deleteEducation = (id) => Education.findByIdAndDelete(id);
