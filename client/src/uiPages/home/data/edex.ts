import {
  GraduationCap,
  School,
  University,
  BookOpen,
  Briefcase,
  Code,
  LucideIcon,
  Code2,
} from "lucide-react";

type EdExData = {
  id: string;
  year: string;
  title: string;
  description: string;
  percentage?: string;
  icon: LucideIcon;
};

export const EDUCATION: EdExData[] = [
  {
    id: "gen-ai",
    title: "Gen AI Fullstack Development",
    description: "Karka Software Academy, Nagercoil.",
    year: "Nov 2025- Feb 2026",
    icon: Code2, // Degree
  },
  {
    id: "bsc",
    title: "B.Sc. Computer Science",
    description: "Pioneer Kumaraswamy College, Nagercoil.",
    year: "2022-2025",
    percentage: "CGPA: 7.34",
    icon: GraduationCap, // Degree
  },
  {
    id: "dme",
    title: "Diploma in Mechanical Engineering",
    description: "Govt Polytechnic College, Konam, Nagercoil.",
    year: "2020-2022",
    percentage: "90%",
    icon: University, // Polytechnic / College
  },
  {
    id: "hsc",
    title: "HSC",
    description: "DVD Higher Secondary School, Nagercoil.",
    year: "2019-2020",
    percentage: "82%",
    icon: School, // School
  },
  {
    id: "sslc",
    title: "SSLC",
    description: "SMRV Higher Secondary School, Nagercoil.",
    year: "2017-2018",
    percentage: "73.2%",
    icon: BookOpen, // Foundation education
  },
];

export const EXPERIENCE: EdExData[] = [
  {
    id: "open-purpl",
    title: "Frontend Developer",
    description: "Open Purpl",
    year: "Dec 2025 - Feb 2026",
    icon: Code, // Dev role
  },
  {
    id: "jas-digicraft-tek",
    title: "React Developer Intern",
    description: "JAS DigicraftTek",
    year: "Jan 2025 - Feb 2026",
    icon: Code, // Dev role
  },
  {
    id: "g-tec",
    title: "Python Internship (20 Days)",
    description: "G-Tec Computer Education Institute",
    year: "Dec 2024 - Jan 2025",
    icon: Briefcase, // Internship / Work
  },
];
