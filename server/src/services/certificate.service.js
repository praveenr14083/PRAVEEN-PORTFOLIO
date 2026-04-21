import { Certificate } from "../models/certificate.model.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";

export const createCertificate = async (data) => {
  return await Certificate.create(data);
};

export const getAllCertificates = async () => {
  return await Certificate.find().sort({ createdAt: -1 });
};

export const getCertificateById = async (id) => {
  return await Certificate.findById(id);
};

export const updateCertificate = async (id, data) => {
  const cert = await Certificate.findById(id);
  if (!cert) return null;

  // Delete old image if new one uploaded
  if (data.image?.public_id && cert.image?.public_id) {
    await deleteFromCloudinary(cert.image.public_id);
  }

  return await Certificate.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCertificate = async (id) => {
  const cert = await Certificate.findById(id);
  if (!cert) return null;

  // Delete image from cloudinary
  if (cert.image?.public_id) {
    await deleteFromCloudinary(cert.image.public_id);
  }

  return await Certificate.findByIdAndDelete(id);
};
