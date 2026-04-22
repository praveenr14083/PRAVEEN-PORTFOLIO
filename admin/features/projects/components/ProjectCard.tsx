"use client"

import React, { useState } from "react"
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
    image?: string
  }
  onEdit?: (project: any) => void
  onDelete?: (projectId: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className="group flex flex-col justify-between overflow-hidden p-0">
      {/* Image Section */}
      {project.image && (
        <div
          className="relative h-50 w-full overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={project.image}
            alt={project.title || "Project image"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 transition-all duration-300">
              {/* Live Demo Button */}
              {project.liveUrl && (
                <Button
                  size="default"
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
                  size="default"
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
      )}

      <CardHeader>
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

      <CardContent className="space-y-4 px-4">
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

      <CardFooter className="flex items-center justify-between gap-2 p-4">
        {/* Action Buttons (Edit/Delete) - Optional */}
        {(onEdit || onDelete) && (
          <div className="flex w-full items-end justify-end gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
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
                onClick={() => onDelete(project.title || "project")}
              >
                <Trash />
                Delete
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
