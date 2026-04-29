import { rateLimit } from 'express-rate-limit'

export const adminLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 500, // 500 requests per IP
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
})
