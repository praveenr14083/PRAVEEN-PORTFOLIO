import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTechnologies, createTechnology, updateTechnology, deleteTechnology } from "../services/technology.service";
import { toast } from "sonner";

export const useTechnologies = () => {
  return useQuery({ queryKey: ["technologies"], queryFn: getTechnologies });
};

export const useCreateTechnology = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTechnology,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Technology created");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to create technology"),
  });
};

export const useUpdateTechnology = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTechnology,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      toast.success("Technology updated");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to update technology"),
  });
};

export const useDeleteTechnology = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTechnology,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Technology deleted");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete technology"),
  });
};
