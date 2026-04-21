import cloudinary from "../config/cloudinary.config.js";

export const deleteFromCloudinary = async (public_id) => {
  if (!public_id) return;
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (err) {
    console.error("Error deleting from Cloudinary:", err);
    throw err;
  }
};
