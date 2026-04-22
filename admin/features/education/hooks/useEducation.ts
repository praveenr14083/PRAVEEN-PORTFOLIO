import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEducation, createEducation, updateEducation, deleteEducation } from "../services/education.service";
import { toast } from "sonner";

export const useEducation = () => {
  return useQuery({ queryKey: ["education"], queryFn: getEducation });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education record created");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to create education"),
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education record updated");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to update education"),
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education record deleted");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete education"),
  });
};
