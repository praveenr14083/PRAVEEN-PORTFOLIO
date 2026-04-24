import { Brain, Database, Monitor, Server } from 'lucide-react'

export const SKILLS_DATA = [
  {
    title: 'Frontend',
    Icon: Monitor,
    description:
      'Crafting modern, responsive, and accessible user interfaces with a strong focus on performance, usability, and clean component architecture using React, Next.js, Tailwind CSS, and the TanStack ecosystem.',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    title: 'Backend',
    Icon: Server,
    description:
      'Building scalable, secure, and high-performance backend services using FastAPI and Python, with clean RESTful API design, authentication, validation, and integration-ready microservice architecture.',
    skills: ['FastAPI', 'Python', 'REST API'],
  },
  {
    title: 'Database',
    Icon: Database,
    description:
      'Designing and managing efficient data models across both NoSQL and SQL systems, ensuring data consistency, performance optimization, and scalability for production-grade applications.',
    skills: ['Firestore', 'MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    title: 'AI & LLM',
    Icon: Brain,
    description:
      'Integrating Large Language Models into real-world applications, designing Retrieval-Augmented Generation (RAG) pipelines, and building intelligent, context-aware AI features for automation and decision support.',
    skills: ['LLM Integration', 'RAG Pipelines', 'Vector Databases', 'AI APIs'],
  },
]
