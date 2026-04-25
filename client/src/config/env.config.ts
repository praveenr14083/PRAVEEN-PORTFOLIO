export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db',
  nodeEnv: process.env.NODE_ENV || 'development',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://praveenr.dev',
  resendApiKey: process.env.RESEND_API_KEY,
}
