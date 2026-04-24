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
  try {
    const { data } = await api.get("/resume");
    return Array.isArray(data.data) ? data.data[0] || null : data.data || null;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const updateResume = async (formData: FormData): Promise<Resume> => {
  const { data } = await api.post("/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const deleteResume = async (): Promise<void> => {
  await api.delete("/resume");
};
