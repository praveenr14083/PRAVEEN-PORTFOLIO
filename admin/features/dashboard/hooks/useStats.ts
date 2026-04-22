import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/stats.service";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
};
