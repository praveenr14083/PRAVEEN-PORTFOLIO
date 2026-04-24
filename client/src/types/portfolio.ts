export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: "draft" | "published";
  featured: boolean;
  liveUrl?: string;
  githubUrl: string;
  image: { url: string; public_id: string };
  createdAt?: string;
}

export interface Resume {
  _id: string;
  file: {
    url: string;
    public_id: string;
  };
}

export interface Skill {
  _id: string;
  name: string;
  description: string;
  icon: string;
  technologies: string[];
}

export interface Education {
  _id: string;
  degree: string;
  institute: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  grade?: string;
  gradeType?: "CGPA" | "Percentage" | "GPA";
  icon?: string;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  location: string;
  employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract" | "Freelance";
  description: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  icon?: string;
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

export interface Certificate {
  _id: string;
  name: string;
  image: { url: string; public_id: string };
}

export interface PortfolioData {
  projects: Project[];
  resume: Resume | null;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  technologies: Technology[];
  certificates: Certificate[];
}

// --- UI / Component Types ---

export interface UICertificate {
  id: string;
  name: string;
  image: string;
}

export type ProjectCategory = "All" | "Frontend" | "Fullstack" | "AI" | string;

export interface UIProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  github: string;
  image: string;
  category: string;
}

export interface UIEdExData {
  id: string;
  year: string;
  title: string;
  description: string;
  percentage?: string;
  isCurrent?: boolean;
  icon: any; // LucideIcon
}
