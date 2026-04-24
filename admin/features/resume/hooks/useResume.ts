import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getResume, updateResume, deleteResume } from "../services/resume.service";
import { toast } from "sonner";

export const useResume = () => {
  return useQuery({ 
    queryKey: ["resume"], 
    queryFn: getResume,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false // Prevents unnecessary fetching on tab switch
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      toast.success("Resume updated successfully");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to update resume"),
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.setQueryData(["resume"], null);
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      toast.success("Resume deleted successfully");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete resume"),
  });
};
