import cloudinary from "../config/cloudinary.config.js";

export const deleteFromCloudinary = async (
  public_id,
  resource_type = "image",
) => {
  if (!public_id) return;

  return await cloudinary.uploader.destroy(public_id, {
    resource_type, // 🔥 THIS IS THE FIX
  });
};
