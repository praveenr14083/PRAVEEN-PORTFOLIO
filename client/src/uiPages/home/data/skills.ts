import { Server, Monitor, Database, Brain } from "lucide-react";

const DUMMY_ICON =
  "https://praveenrdev.vercel.app/_next/image?url=%2Fassets%2Fhero%2Fpraveen1.png&w=1920&q=75";

export const SKILLS_DATA = [
  {
    title: "Frontend",
    Icon: Monitor,
    description:
      "Crafting modern, responsive, and accessible user interfaces with a strong focus on performance, usability, and clean component architecture using React, Next.js, Tailwind CSS, and the TanStack ecosystem.",
    skills: [
      { name: "React.js", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
      { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
    ],
  },
  {
    title: "Backend",
    Icon: Server,
    description:
      "Building scalable, secure, and high-performance backend services using FastAPI and Python, with clean RESTful API design, authentication, validation, and integration-ready microservice architecture.",
    skills: [
      { name: "FastAPI", icon: "https://skillicons.dev/icons?i=fastapi" },
      { name: "Python", icon: "https://skillicons.dev/icons?i=py" },
      {
        name: "REST API",
        icon: "https://cdn-icons-png.flaticon.com/512/8297/8297437.png",
      },
    ],
  },
  {
    title: "Database",
    Icon: Database,
    description:
      "Designing and managing efficient data models across both NoSQL and SQL systems, ensuring data consistency, performance optimization, and scalability for production-grade applications.",
    skills: [
      { name: "Firestore", icon: "https://skillicons.dev/icons?i=firebase" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongo" },
      { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
      { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
    ],
  },
  {
    title: "AI & LLM",
    Icon: Brain,
    description:
      "Integrating Large Language Models into real-world applications, designing Retrieval-Augmented Generation (RAG) pipelines, and building intelligent, context-aware AI features for automation and decision support.",
    skills: [
      {
        name: "LLM Integration",
        icon: "https://cdn-icons-png.flaticon.com/512/8134/8134658.png",
      },
      {
        name: "RAG Pipelines",
        icon: "https://cdn-icons-png.flaticon.com/512/9986/9986427.png",
      },
      {
        name: "Vector Databases",
        icon: "https://cdn-icons-png.flaticon.com/512/3598/3598209.png",
      },
      {
        name: "AI APIs",
        icon: "https://cdn-icons-png.flaticon.com/512/11104/11104255.png",
      },
    ],
  },
];
