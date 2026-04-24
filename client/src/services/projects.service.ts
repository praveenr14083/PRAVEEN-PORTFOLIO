import { Project } from "@/uiPages/home/data/projects";

export const projectService = {
  // 🔥 Fetch all projects
  getAll: async (): Promise<Project[]> => {
    const res = await fetch("/api/projects");

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const response = await res.json();
    const data = response?.data || response || [];

    // 🔥 Normalize data
    const formatted = (Array.isArray(data) ? data : []).map((p: any) => ({
      id: p.id,
      title: p.title || "",
      description: p.description || "",
      category:
        ((p.category?.charAt(0).toUpperCase() + p.category?.slice(1)) as any) ||
        "Frontend",
      tech:
        typeof p.tech === "string"
          ? p.tech
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : Array.isArray(p.tech)
            ? p.tech
            : [],
      github: p.github || "",
      demo: p.demo || "",
      image: p.image || "",
    }));

    return formatted;
  },
};
