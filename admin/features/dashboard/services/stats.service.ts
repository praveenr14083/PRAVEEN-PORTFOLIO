import { api } from "@/lib/api";

export interface DashboardStats {
  projects: number;
  tech: number;
  skills: number;
  certificates: number;
}

export const getStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get<{ success: boolean; data: DashboardStats }>("/stats");
  return data.data;
};
