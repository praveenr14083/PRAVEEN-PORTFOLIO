export type ProjectCategory = "All" | "Frontend" | "Fullstack" | "AI";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  github: string;
  image: string;
  category: ProjectCategory;
}

const DUMMY_IMAGE = "https://placehold.co/600x400/png";

export const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive dashboard for managing products, orders, and analytics with real-time data visualization.",
    tech: ["React", "Next.js", "Tailwind CSS", "Recharts"],
    demo: "https://demo.com",
    github: "https://github.com",
    image: DUMMY_IMAGE,
    category: "Frontend",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Full-stack application for tracking tasks with authentication, drag-and-drop features, and team collaboration tools.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com",
    image: DUMMY_IMAGE,
    category: "Fullstack",
  },
  {
    id: "3",
    title: "AI Image Generator",
    description:
      "An application that uses Stable Diffusion to generate images from text prompts, featuring a gallery and user profiles.",
    tech: ["Python", "FastAPI", "React", "PyTorch"],
    demo: "https://demo.com",
    github: "https://github.com",
    image: DUMMY_IMAGE,
    category: "AI",
  },
  {
    id: "4",
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing skills, projects, and contact information with smooth animations.",
    tech: ["React", "TypeScript", "Framer Motion"],
    demo: "https://demo.com",
    github: "https://github.com",
    image: DUMMY_IMAGE,
    category: "Frontend",
  },
  {
    id: "5",
    title: "Chat Application",
    description:
      "Real-time chat application with private messaging, group chats, and file sharing capabilities.",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Prisma"],
    github: "https://github.com",
    image: DUMMY_IMAGE,
    category: "Fullstack",
  },
  {
    id: "6",
    title: "RAG Document Assistant",
    description:
      "An AI-powered document assistant that lets users chat with their PDF documents using RAG technology.",
    tech: ["LangChain", "OpenAI", "Pinecone", "Next.js"],
    demo: "https://demo.com",
    github: "https://github.com",
    image: DUMMY_IMAGE,
    category: "AI",
  },
];
