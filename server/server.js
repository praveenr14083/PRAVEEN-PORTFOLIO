import app from "./src/app.js";
import { connectDB } from "./src/config/db.config.js";
import { env } from "./src/config/env.config.js";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
};

startServer();
