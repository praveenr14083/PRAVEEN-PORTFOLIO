import logger from '../utils/logger.js'

export const errorMiddleware = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} | ${req.method} ${req.originalUrl}`, { stack: err.stack })

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
};
