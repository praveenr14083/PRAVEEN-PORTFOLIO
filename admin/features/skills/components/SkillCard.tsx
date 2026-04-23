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
import { Pen, Trash } from "lucide-react"
import { DynamicIcon } from "lucide-react/dynamic"
import { useState } from "react"

type SkillCardProps = {
  skill: {
    _id?: string
    name?: string
    description?: string
    technologies?: string[]
    icon?: string
  }
  onEdit?: (skill: any) => void
  onDelete?: (skillId: string) => void
}

export function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group flex flex-col justify-between p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Section */}
      <CardHeader className="flex items-center gap-2 px-0">
        <div className="rounded-lg bg-muted p-2">
          <DynamicIcon name={(skill.icon || "code") as any} />
        </div>

        <CardTitle className="line-clamp-1 text-lg">
          {skill.name || "Untitled Skill"}
        </CardTitle>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="space-y-4 px-0">
        {/* Description */}
        {skill.description && (
          <CardDescription className="text-sm">
            {skill.description}
          </CardDescription>
        )}

        {/* Technologies */}
        {skill.technologies && skill.technologies.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {skill.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer with Action Buttons */}
      <CardFooter className="flex items-center justify-between gap-2 px-0">
        {/* Action Buttons (Edit/Delete) */}
        {(onEdit || onDelete) && (
          <div className="flex w-full items-end justify-end gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(skill)}
                className="flex-1"
              >
                <Pen />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(skill._id || "")}
                className="gap-1"
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
