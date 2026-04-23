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
    <Card className="flex flex-col justify-between p-4">
      <CardHeader className="px-0">
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

      <CardContent className="space-y-3 px-0">
        {education.location && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Locate className="h-4 w-4" /> {education.location}
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

      <CardFooter className="flex justify-end gap-2 px-0">
        {onEdit && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(education)}
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
            onClick={() => onDelete(education._id || "")}
          >
            <Trash />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
