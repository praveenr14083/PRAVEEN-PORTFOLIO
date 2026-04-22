import { useMutation } from "@tanstack/react-query";
import { login as authLogin, signOut as authSignOut } from "../services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: authLogin,
    onSuccess: async (user) => {
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      toast.success("Login successful");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      toast.error(error?.message || "Login failed. Please check your credentials.");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authSignOut,
    onSuccess: () => {
      router.push("/login");
      toast.success("Logged out successfully");
    },
  });
};
