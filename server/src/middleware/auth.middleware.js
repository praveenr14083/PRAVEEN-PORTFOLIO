import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let isFirebaseInitialized = false;

try {
  const serviceAccountParams = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Replace literal '\n' with actual line breaks for the private key
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  if (serviceAccountParams.projectId && serviceAccountParams.clientEmail && serviceAccountParams.privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountParams),
    });
    isFirebaseInitialized = true;
    console.log("Firebase Admin SDK initialized successfully");
  } else {
    console.log("Firebase Admin SDK check: credentials missing (not initialized).");
  }
} catch (error) {
  console.log("Firebase Admin SDK initialize error:", error);
}

export const verifyAdmin = async (req, res, next) => {
  if (!isFirebaseInitialized) {
    // If not initialized, throw error.
    console.warn("Auth bypass: Firebase not configured. Ensure ENV vars are set.");
    return res.status(500).json({ success: false, message: "Server misconfiguration: Firebase not initialized." });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: Missing Token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid Token", error: err.message });
  }
};
