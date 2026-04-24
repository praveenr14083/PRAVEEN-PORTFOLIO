import logger from '../utils/logger.js'

export const validate = (schema) => (req, res, next) => {
  try {
    logger.debug('Validation Middleware: Input req.body: %o', req.body)
    const validatedData = schema.parse(req.body)
    logger.debug('Validation Middleware: Validated req.body: %o', validatedData)
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
