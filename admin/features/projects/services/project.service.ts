import { api } from "@/lib/api";

export interface Project {
  _id: string;
  title: string;
  category: string;
  status: string;
  featured: boolean;
  description?: string;
  technologies: string[];
  image?: { url: string; public_id: string };
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await api.get("/projects");
  return data.data;
};

export const createProject = async (formData: FormData): Promise<Project> => {
  const { data } = await api.post("/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const updateProject = async ({ id, formData }: { id: string; formData: FormData }): Promise<Project> => {
  const { data } = await api.put(`/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
