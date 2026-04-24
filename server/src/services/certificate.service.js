import { Certificate } from '../models/certificate.model.js'
import { deleteFromCloudinary } from '../utils/cloudinary.js'
import logger from '../utils/logger.js'

export const createCertificate = async (data) => {
  return await Certificate.create(data)
}

export const getAllCertificates = async () => {
  return await Certificate.find().sort({ createdAt: -1 })
}

export const getCertificateById = async (id) => {
  return await Certificate.findById(id)
}

export const updateCertificate = async (id, data) => {
  const cert = await Certificate.findById(id)
  if (!cert) return null

  // If image is explicitly set to null (removal) or a new one is uploaded, delete the old one
  if (data.image !== undefined && cert.image?.public_id) {
    logger.debug(`Certificate Service: Checking image update for cert ${id}, new image: %o`, data.image)
    if (data.image === null || data.image.public_id !== cert.image.public_id) {
      logger.debug(`Certificate Service: Deleting old image from Cloudinary [${cert.image.public_id}]`)
      await deleteFromCloudinary(cert.image.public_id)
    }
  }

  if (data.image === null) {
    logger.debug('Certificate Service: Removing image from DB using $unset')
    const { image, ...updateData } = data
    return await Certificate.findByIdAndUpdate(id, { ...updateData, $unset: { image: 1 } }, { new: true })
  }

  return await Certificate.findByIdAndUpdate(id, data, { new: true })
}

export const deleteCertificate = async (id) => {
  const cert = await Certificate.findById(id)
  if (!cert) return null

  // Delete image from cloudinary
  if (cert.image?.public_id) {
    await deleteFromCloudinary(cert.image.public_id)
  }

  return await Certificate.findByIdAndDelete(id)
}
