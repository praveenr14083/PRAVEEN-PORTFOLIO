"use client";

import { useQuery } from "@tanstack/react-query";
import { portfolioService } from "@/services/portfolioService";
import { PortfolioData } from "@/types/portfolio";
import { PROJECTS_DATA } from "@/uiPages/home/data/projects";
import { EDUCATION, EXPERIENCE } from "@/uiPages/home/data/edex";
import { SKILLS_DATA } from "@/uiPages/home/data/skills";
import { CERTIFICATES_DATA } from "@/uiPages/home/data/certificates";

const fallbackData: PortfolioData = {
  projects: PROJECTS_DATA as any,
  resume: null,
  skills: SKILLS_DATA.map(s => ({
    _id: s.title,
    name: s.title,
    description: s.description,
    icon: s.Icon.displayName || "code",
    technologies: s.skills
  })),
  education: EDUCATION as any,
  experience: EXPERIENCE as any,
  technologies: [],
  certificates: CERTIFICATES_DATA,
};

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
