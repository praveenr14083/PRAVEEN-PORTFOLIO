import { api } from "@/lib/api";

export interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract" | "Freelance";
  description?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
}

export const getExperience = async (): Promise<Experience[]> => {
  const { data } = await api.get("/experience");
  return data.data;
};

export const createExperience = async (experienceData: Partial<Experience>): Promise<Experience> => {
  const { data } = await api.post("/experience", experienceData);
  return data.data;
};

export const updateExperience = async ({ id, experienceData }: { id: string; experienceData: Partial<Experience> }): Promise<Experience> => {
  const { data } = await api.put(`/experience/${id}`, experienceData);
  return data.data;
};

export const deleteExperience = async (id: string): Promise<void> => {
  await api.delete(`/experience/${id}`);
};
