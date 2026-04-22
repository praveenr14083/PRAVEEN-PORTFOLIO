import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../services/skill.service";
import { toast } from "sonner";

export const useSkills = () => {
  return useQuery({ queryKey: ["skills"], queryFn: getSkills });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Skill created");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to create skill"),
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to update skill"),
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Skill deleted");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete skill"),
  });
};
