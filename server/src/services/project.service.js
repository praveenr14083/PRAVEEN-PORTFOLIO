import Project from '../models/project.model.js'
import { deleteFromCloudinary } from '../utils/cloudinary.js'
import logger from '../utils/logger.js'

export const createProject = async (data) => {
  return await Project.create(data)
}

export const getAllProjects = async (query) => {
  const filter = {}

  if (query.status) filter.status = query.status
  if (query.category) filter.category = query.category

  return await Project.find(filter).sort({ createdAt: -1 })
}

export const getProjectById = async (id) => {
  return await Project.findById(id)
}

export const updateProject = async (id, data) => {
  const project = await Project.findById(id)
  if (!project) return null

  // If a new image is being uploaded or image is being removed (data.image is null), delete the old one
  if (data.image !== undefined && project.image?.public_id) {
    logger.debug(`Project Service: Checking image update for project ${id}, new image: %o`, data.image)
    if (data.image === null || data.image.public_id !== project.image.public_id) {
      logger.debug(`Project Service: Deleting old image from Cloudinary [${project.image.public_id}]`)
      await deleteFromCloudinary(project.image.public_id)
    }
  }

  const updateData = { ...data }
  const unsetData = {}

  if (data.image === null) {
    delete updateData.image
    unsetData.image = 1
  }

  // If URLs are empty strings or null, unset them to clear from DB
  if (data.liveUrl === "" || data.liveUrl === null) {
    delete updateData.liveUrl
    unsetData.liveUrl = 1
  }

  if (data.githubUrl === "" || data.githubUrl === null) {
    delete updateData.githubUrl
    unsetData.githubUrl = 1
  }

  const query = { $set: updateData }
  if (Object.keys(unsetData).length > 0) {
    query.$unset = unsetData
  }

  return await Project.findByIdAndUpdate(id, query, { new: true })
}

export const deleteProject = async (id) => {
  const project = await Project.findById(id)

  if (!project) return null

  // Delete image from Cloudinary if it exists
  if (project.image?.public_id) {
    await deleteFromCloudinary(project.image.public_id)
  }

  return await Project.findByIdAndDelete(id)
}
