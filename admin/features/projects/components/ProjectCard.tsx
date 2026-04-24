"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, GitBranch, Pen, Star, Trash } from "lucide-react"
import { useState } from "react"

type ProjectCardProps = {
  project: {
    title?: string
    description?: string
    technologies?: string[]
    category?: string
    status?: string
    featured?: boolean
    liveUrl?: string
    githubUrl?: string
    image?: { url: string; public_id: string }
    _id?: string
  }
  onEdit?: (project: any) => void
  onDelete?: (projectId: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className="group flex flex-col justify-between overflow-hidden p-4">
      {/* Image Section */}
      <div
        className="relative h-50 w-full overflow-hidden rounded-lg bg-muted"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {project.image ? (
          <img
            src={project.image.url}
            alt={project.title || "Project image"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              {/* Using a custom icon or text for project placeholder */}
              <div className="h-12 w-12 rounded-full bg-muted p-3">
                <GitBranch className="h-full w-full stroke-[1.5px]" />
              </div>
              <span className="text-xs font-medium opacity-50 uppercase tracking-wider">No Project Image</span>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 transition-all duration-300">
            {/* Live Demo Button */}
            {project.liveUrl && (
              <Button
                size="sm"
                variant="default"
                onClick={() => window.open(project.liveUrl, "_blank")}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}

            {/* GitHub Button */}
            {project.githubUrl && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => window.open(project.githubUrl, "_blank")}
                className="gap-2"
              >
                <GitBranch className="h-4 w-4" />
                GitHub
              </Button>
            )}
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-yellow-500 text-white">
              <Star className="mr-1 h-3 w-3" />
              Featured
            </Badge>
          </div>
        )}

        {/* Draft Badge */}
        {project.status === "draft" && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">Draft</Badge>
          </div>
        )}
      </div>

      <CardHeader className="px-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-1 text-xl">
              {project.title || "Untitled Project"}
            </CardTitle>
            {project.category && (
              <div className="mt-2">
                <Badge>{project.category}</Badge>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-0">
        {/* Description */}
        {project.description && (
          <CardDescription className="text-sm">
            {project.description}
          </CardDescription>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech.trim()}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 px-0">
        {/* Action Buttons (Edit/Delete) - Optional */}
        {(onEdit || onDelete) && (
          <div className="flex w-full items-end justify-end gap-2">
            {onEdit && (
              <Button
                className="flex-1"
                variant="outline"
                size="sm"
                onClick={() => onEdit(project)}
              >
                <Pen />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(project._id || project.title || "")}
              >
                <Trash />
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
