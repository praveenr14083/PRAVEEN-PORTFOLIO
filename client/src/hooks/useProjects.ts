"use client";

import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/projects.service";

// 🔑 Query Keys
const QUERY_KEYS = {
  PROJECTS: ["projects"],
};

// ✅ GET ALL PROJECTS
export const useProjects = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECTS,
    queryFn: projectService.getAll,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
