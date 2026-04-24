"use client";

import { useQuery } from "@tanstack/react-query";
import { portfolioService } from "@/services/portfolioService";
import { fallbackData, PortfolioData } from "@/utils/data";

export const usePortfolio = () => {
  const query = useQuery<PortfolioData>({
    queryKey: ["portfolio"],
    queryFn: portfolioService.getPortfolioData,
    initialData: fallbackData,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    ...query,
    portfolioData: query.data || fallbackData,
  };
};
