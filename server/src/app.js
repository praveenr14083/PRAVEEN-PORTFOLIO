import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { env } from './config/env.config.js'
import { apiLimiter } from './middleware/rateLimiter.middleware.js'
import logger from './utils/logger.js'

import certificateRoutes from './routes/certificate.routes.js'
import educationRoutes from './routes/education.routes.js'
import experienceRoutes from './routes/experience.routes.js'
import projectRoutes from './routes/project.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import skillRoutes from './routes/skill.routes.js'
import statsRoutes from './routes/stats.routes.js'
import technologyRoutes from './routes/technology.routes.js'

import { verifyAdmin } from './middleware/auth.middleware.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()

// Rate Limiting
app.use(apiLimiter)

// CORS
app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
)

app.use(express.json())
// Pipe HTTP request logs through Winston
app.use(morgan('combined', { stream: logger.stream }))

// health
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API running 🚀' })
})

// protect all API routes (except maybe login if there was one, but Firebase handles login client-side)
app.use('/api', verifyAdmin)

// routes
app.use('/api/stats', statsRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/technologies', technologyRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/education', educationRoutes)

// 404
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`)
  res.status(404).json({ success: false, message: 'Route not found' })
})

// error
app.use(errorMiddleware)

export default app
