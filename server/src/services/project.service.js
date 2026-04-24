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

  if (data.image === null) {
    logger.debug('Project Service: Removing image from DB using $unset')
    const { image, ...updateData } = data
    return await Project.findByIdAndUpdate(id, { ...updateData, $unset: { image: 1 } }, { new: true })
  }

  return await Project.findByIdAndUpdate(id, data, { new: true })
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
