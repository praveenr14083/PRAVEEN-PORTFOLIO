import React from "react";
import { Github, ExternalLink, Folder } from "lucide-react";
import { UIProject } from "@/types/portfolio";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: UIProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative w-full h-full bg-foreground/5 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary-color/50 transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <Link
            href={project.github}
            target="_blank"
            className="p-2 bg-background/80 rounded-full hover:bg-primary-color hover:text-white transition-colors"
          >
            <Github size={20} />
          </Link>
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              className="p-2 bg-background/80 rounded-full hover:bg-primary-color hover:text-white transition-colors"
            >
              <ExternalLink size={20} />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow gap-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary-color transition-colors">
            {project.title}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {project.category}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-3 grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-foreground/5 rounded text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
