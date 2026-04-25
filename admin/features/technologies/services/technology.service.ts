import { api } from "@/lib/api";

export interface Technology {
  _id: string;
  name: string;
  category: string;
  icon?: { url: string; public_id: string };
  createdAt: string;
}

export const getTechnologies = async (): Promise<Technology[]> => {
  const { data } = await api.get("/technologies");
  return data.data;
};

export const createTechnology = async (formData: FormData): Promise<Technology> => {
  const { data } = await api.post("/technologies", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const updateTechnology = async ({ id, formData }: { id: string; formData: FormData }): Promise<Technology> => {
  const { data } = await api.put(`/technologies/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const deleteTechnology = async (id: string): Promise<void> => {
  await api.delete(`/technologies/${id}`);
};
