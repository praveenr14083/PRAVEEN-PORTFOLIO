import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from "../services/certificate.service";
import { toast } from "sonner";

export const useCertificates = () => {
  return useQuery({ queryKey: ["certificates"], queryFn: getCertificates });
};

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Certificate created");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to create certificate"),
  });
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      toast.success("Certificate updated");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to update certificate"),
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Certificate deleted");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete certificate"),
  });
};
