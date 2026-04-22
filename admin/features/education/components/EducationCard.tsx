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
import { Pen, Trash, Calendar } from "lucide-react"

type EducationCardProps = {
  education: {
    _id?: string
    degree?: string
    institute?: string
    location?: string
    startDate?: string
    endDate?: string | null
    isCurrent?: boolean
    grade?: string
    gradeType?: string
  }
  onEdit?: (education: any) => void
  onDelete?: (eduId: string) => void
}

export function EducationCard({
  education,
  onEdit,
  onDelete,
}: EducationCardProps) {
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
              {education.degree || "Untitled"}
            </CardTitle>
            <CardDescription className="mt-1">
              {education.institute}
            </CardDescription>
          </div>
          {education.isCurrent && (
            <Badge className="ml-2 bg-green-500">Current</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {education.location && (
          <p className="text-sm text-muted-foreground">
            📍 {education.location}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(education.startDate)} -{" "}
            {education.isCurrent ? "Present" : formatDate(education.endDate)}
          </span>
        </div>

        {education.grade && (
          <p className="text-sm">
            <span className="font-medium">Grade:</span> {education.grade}{" "}
            <span className="text-muted-foreground">
              ({education.gradeType})
            </span>
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {onEdit && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(education)}
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
            onClick={() => onDelete(education._id || "")}
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
