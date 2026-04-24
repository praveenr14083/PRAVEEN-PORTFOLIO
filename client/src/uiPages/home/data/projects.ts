import { Project } from "@/types/portfolio";

const DUMMY_IMAGE = "https://placehold.co/600x400/png";

export const PROJECTS_DATA: Project[] = [
  {
    _id: "1",
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing products, orders, and analytics with real-time data visualization.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Recharts"],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    image: { url: DUMMY_IMAGE, public_id: "dummy1" },
    category: "Frontend",
    status: "published",
    featured: true
  },
  {
    _id: "2",
    title: "Task Management App",
    description: "Full-stack application for tracking tasks with authentication, drag-and-drop features, and team collaboration tools.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com",
    image: { url: DUMMY_IMAGE, public_id: "dummy2" },
    category: "Fullstack",
    status: "published",
    featured: false
  },
  {
    _id: "3",
    title: "AI Image Generator",
    description: "An application that uses Stable Diffusion to generate images from text prompts.",
    technologies: ["Python", "FastAPI", "React", "PyTorch"],
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    image: { url: DUMMY_IMAGE, public_id: "dummy3" },
    category: "AI",
    status: "published",
    featured: true
  }
];
