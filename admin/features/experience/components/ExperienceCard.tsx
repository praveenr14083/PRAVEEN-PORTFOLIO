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
import { Calendar, Locate, Pen, Trash } from "lucide-react"

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
    <Card className="flex flex-col justify-between p-4">
      <CardHeader className="px-0">
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

      <CardContent className="space-y-3 px-0">
        <div>
          <Badge variant="outline">{experience.employmentType}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Locate className="h-4 w-4" />
          <span>{experience.location || "Remote"}</span>
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

      <CardFooter className="flex justify-end gap-2 px-0">
        {onEdit && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(experience)}
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
            onClick={() => onDelete(experience._id || "")}
          >
            <Trash />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
