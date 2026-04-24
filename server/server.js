import app from "./src/app.js";
import { connectDB } from "./src/config/db.config.js";
import { env } from "./src/config/env.config.js";
import logger from "./src/utils/logger.js";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on port ${env.PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
};

// ── Global error guards ──────────────────────────────────────────────────────
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

startServer();
