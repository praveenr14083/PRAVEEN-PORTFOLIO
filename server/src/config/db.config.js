import mongoose from 'mongoose'
import logger from '../utils/logger.js'
import { env } from './env.config.js'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongodbUri)
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    logger.error(`❌ Database connection failed: ${error.message}`)
    process.exit(1)
  }
}
