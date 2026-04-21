import Project from "../models/project.model.js";

export const createProject = async (data) => {
  return await Project.create(data);
};

export const getAllProjects = async (query) => {
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.category) filter.category = query.category;

  return await Project.find(filter).sort({ createdAt: -1 });
};

export const getProjectById = async (id) => {
  return await Project.findById(id);
};

export const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};
