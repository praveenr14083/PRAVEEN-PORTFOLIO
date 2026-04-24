export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  github: string;
  image: string;
  category: string;
}

export interface Skill {
  name: string;
  description: string;
  icon: string;
  technologies: string[];
}

export interface Education {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: string;
}

export interface Resume {
  file: {
    url: string;
    public_id: string;
  };
}

export interface Technology {
  _id: string;
  name: string;
  icon: {
    url: string;
    public_id: string;
  };
  category: "frontend" | "backend" | "database" | "tools";
}

export interface PortfolioData {
  projects: any[];
  resume: Resume | null;
  skills: any[];
  education: any[];
  experience: any[];
  technologies: Technology[];
}

export const fallbackData: PortfolioData = {
  projects: [],
  resume: null,
  skills: [],
  education: [
    {
      id: "gen-ai",
      title: "Gen AI Fullstack Development",
      description: "Karka Software Academy, Nagercoil.",
      year: "Nov 2025- Feb 2026",
      icon: "Code2",
    },
    {
      id: "bsc",
      title: "B.Sc. Computer Science",
      description: "Pioneer Kumaraswamy College, Nagercoil.",
      year: "2022-2025",
      icon: "GraduationCap",
    }
  ],
  experience: [
    {
      id: "open-purpl",
      title: "Frontend Developer",
      description: "Open Purpl",
      year: "Dec 2025 - Feb 2026",
      icon: "Code",
    }
  ],
  technologies: [],
};
