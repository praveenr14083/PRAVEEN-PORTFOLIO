"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pen, Trash, Calendar, MapPin } from "lucide-react"

type ExperienceCardProps = {
  experience: {
    _id?: string
    role?: string
    company?: string
    location?: string
    employmentType?: string
    description?: string
    startDate?: string
    endDate?: string | null
    isCurrent?: boolean
  }
  onEdit?: (experience: any) => void
  onDelete?: (expId: string) => void
}

export function ExperienceCard({
  experience,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-1 text-lg">
              {experience.role || "Untitled"}
            </CardTitle>
            <CardDescription className="mt-1">
              {experience.company}
            </CardDescription>
          </div>
          {experience.isCurrent && (
            <Badge className="ml-2 bg-green-500">Current</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{experience.location || "Remote"}</span>
        </div>

        <div>
          <Badge variant="outline">{experience.employmentType}</Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(experience.startDate)} -{" "}
            {experience.isCurrent ? "Present" : formatDate(experience.endDate)}
          </span>
        </div>

        {experience.description && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {experience.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {onEdit && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(experience)}
            className="gap-1"
          >
            <Pen className="h-4 w-4" />
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(experience._id || "")}
            className="gap-1"
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
