import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut as firebaseSignOut, User } from "firebase/auth";
import { LoginInput } from "../validation/auth.validation";

export const login = async ({ email, password }: LoginInput): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
  localStorage.removeItem("token");
};

export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};
