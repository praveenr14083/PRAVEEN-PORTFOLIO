import { api } from "@/lib/api";

export interface Certificate {
  _id: string;
  name: string;
  image?: { url: string; public_id: string };
  createdAt: string;
}

export const getCertificates = async (): Promise<Certificate[]> => {
  const { data } = await api.get("/certificates");
  return data.data;
};

export const createCertificate = async (formData: FormData): Promise<Certificate> => {
  const { data } = await api.post("/certificates", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const updateCertificate = async ({ id, formData }: { id: string; formData: FormData }): Promise<Certificate> => {
  const { data } = await api.put(`/certificates/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const deleteCertificate = async (id: string): Promise<void> => {
  await api.delete(`/certificates/${id}`);
};
