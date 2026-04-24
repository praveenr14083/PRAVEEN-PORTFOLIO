"use client";

import { useQuery } from "@tanstack/react-query";
import { resumeService, type Resume } from "@/services/resume.service";

// 🔑 Query Keys
const QUERY_KEYS = {
  RESUME: ["resume"],
};

// ✅ GET RESUME
export const useResume = () => {
  return useQuery<Resume | null>({
    queryKey: QUERY_KEYS.RESUME,
    queryFn: resumeService.get,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
