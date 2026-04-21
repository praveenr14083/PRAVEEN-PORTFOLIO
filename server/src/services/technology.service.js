import { Technology } from "../models/technology.model.js";

export const createTechnology = async (data) => {
  return await Technology.create(data);
};

export const getAllTechnologies = async () => {
  return await Technology.find().sort({ createdAt: -1 });
};

export const getTechnologyById = async (id) => {
  return await Technology.findById(id);
};

export const updateTechnology = async (id, data) => {
  return await Technology.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTechnology = async (id) => {
  return await Technology.findByIdAndDelete(id);
};
