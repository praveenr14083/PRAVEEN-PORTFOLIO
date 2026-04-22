import { api } from "@/lib/api";

export interface Skill {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  technologies: string[];
}

export const getSkills = async (): Promise<Skill[]> => {
  const { data } = await api.get("/skills");
  return data.data;
};

export const createSkill = async (skillData: Partial<Skill>): Promise<Skill> => {
  const { data } = await api.post("/skills", skillData);
  return data.data;
};

export const updateSkill = async ({ id, skillData }: { id: string; skillData: Partial<Skill> }): Promise<Skill> => {
  const { data } = await api.put(`/skills/${id}`, skillData);
  return data.data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete(`/skills/${id}`);
};
