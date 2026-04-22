import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/project.service";
import { toast } from "sonner";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Project created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create project");
    },
  });
};
