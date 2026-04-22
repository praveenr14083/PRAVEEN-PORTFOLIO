import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExperience, createExperience, updateExperience, deleteExperience } from "../services/experience.service";
import { toast } from "sonner";

export const useExperience = () => {
  return useQuery({ queryKey: ["experience"], queryFn: getExperience });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience record created");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to create experience"),
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience record updated");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to update experience"),
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      toast.success("Experience record deleted");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete experience"),
  });
};
