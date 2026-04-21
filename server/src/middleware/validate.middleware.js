export const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData; // Assign the transformed data back to req.body
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: null,
      error: err.errors,
    });
  }
};
