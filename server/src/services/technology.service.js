import { Technology } from '../models/technology.model.js'
import { deleteFromCloudinary } from '../utils/cloudinary.js'
import logger from '../utils/logger.js'

export const createTechnology = async (data) => {
  return await Technology.create(data)
}

export const getAllTechnologies = async () => {
  return await Technology.find().sort({ createdAt: -1 })
}

export const getTechnologyById = async (id) => {
  return await Technology.findById(id)
}

export const updateTechnology = async (id, data) => {
  const tech = await Technology.findById(id)
  if (!tech) return null

  // Delete old icon if new one uploaded or icon is being removed
  if (data.icon !== undefined && tech.icon?.public_id) {
    logger.debug(`Technology Service: Checking icon update for tech ${id}, new icon: %o`, data.icon)
    if (data.icon === null || data.icon.public_id !== tech.icon.public_id) {
      logger.debug(`Technology Service: Deleting old icon from Cloudinary [${tech.icon.public_id}]`)
      await deleteFromCloudinary(tech.icon.public_id)
    }
  }

  if (data.icon === null) {
    logger.debug('Technology Service: Removing icon from DB using $unset')
    const { icon, ...updateData } = data
    return await Technology.findByIdAndUpdate(id, { ...updateData, $unset: { icon: 1 } }, { new: true })
  }

  return await Technology.findByIdAndUpdate(id, data, { new: true })
}

export const deleteTechnology = async (id) => {
  const tech = await Technology.findById(id)

  if (!tech) return null

  // Delete icon from Cloudinary if it exists
  if (tech.icon?.public_id) {
    await deleteFromCloudinary(tech.icon.public_id)
  }

  return await Technology.findByIdAndDelete(id)
}
