import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/evervault-card'
import { UIProject } from '@/types/portfolio'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  project: UIProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group border border-black/[0.2] dark:border-white/[0.2] p-6 relative">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
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
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold group-hover:text-primary-color transition-colors">
            {project.title}
          </h3>
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm ">{project.description}</p>

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
  )
}
