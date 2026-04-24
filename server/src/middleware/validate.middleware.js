export const validate = (schema) => (req, res, next) => {
  try {
    console.log('Validation Middleware: Input req.body:', req.body)
    const validatedData = schema.parse(req.body)
    console.log('Validation Middleware: Validated req.body:', validatedData)
    req.body = validatedData // Assign the transformed data back to req.body
    next()
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: null,
      error: err.errors,
    });
  }
};
