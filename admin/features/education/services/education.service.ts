import { api } from "@/lib/api";

export interface Education {
  _id: string;
  degree: string;
  institute: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  grade?: string;
  gradeType?: "CGPA" | "Percentage" | "GPA";
}

export const getEducation = async (): Promise<Education[]> => {
  const { data } = await api.get("/education");
  return data.data;
};

export const createEducation = async (educationData: Partial<Education>): Promise<Education> => {
  const { data } = await api.post("/education", educationData);
  return data.data;
};

export const updateEducation = async ({ id, educationData }: { id: string; educationData: Partial<Education> }): Promise<Education> => {
  const { data } = await api.put(`/education/${id}`, educationData);
  return data.data;
};

export const deleteEducation = async (id: string): Promise<void> => {
  await api.delete(`/education/${id}`);
};
