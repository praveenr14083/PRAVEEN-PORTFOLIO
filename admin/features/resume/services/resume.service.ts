import { api } from "@/lib/api";

export interface Resume {
  _id: string;
  file: {
    url: string;
    public_id: string;
  };
  updatedAt: string;
}

export const getResume = async (): Promise<Resume | null> => {
  const { data } = await api.get("/resume");
  // Assuming backend returns an array or a single object. 
  // Standard is usually an array of one if it's a singleton pattern in MongoDB.
  return Array.isArray(data.data) ? data.data[0] || null : data.data || null;
};

export const updateResume = async (formData: FormData): Promise<Resume> => {
  const { data } = await api.post("/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const deleteResume = async (id: string): Promise<void> => {
  await api.delete(`/resume/${id}`);
};
