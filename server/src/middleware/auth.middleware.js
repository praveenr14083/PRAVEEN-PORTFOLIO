import admin from 'firebase-admin'
import { env } from '../config/env.config.js'
import logger from '../utils/logger.js'

let isFirebaseInitialized = false

try {
  const serviceAccountParams = {
    projectId: env.firebase.projectId,
    clientEmail: env.firebase.clientEmail,
    // Replace literal '\n' with actual line breaks for the private key
    privateKey: env.firebase.privateKey?.replace(/\\n/g, '\n'),
  }

  if (
    serviceAccountParams.projectId &&
    serviceAccountParams.clientEmail &&
    serviceAccountParams.privateKey
  ) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountParams),
    })
    isFirebaseInitialized = true
    logger.info('Firebase Admin SDK initialized successfully')
  } else {
    logger.warn('Firebase Admin SDK check: credentials missing (not initialized).')
  }
} catch (error) {
  logger.error('Firebase Admin SDK initialize error:', { stack: error.stack })
}

export const verifyAdmin = async (req, res, next) => {
  if (!isFirebaseInitialized) {
    // If not initialized, throw error.
    logger.warn('Auth bypass: Firebase not configured. Ensure ENV vars are set.')
    return res
      .status(500)
      .json({ success: false, message: 'Server misconfiguration: Firebase not initialized.' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing Token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized: Invalid Token', error: err.message })
  }
}
