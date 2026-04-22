"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pen, Trash } from "lucide-react"

type TechnologyCardProps = {
  technology: {
    name?: string
    category?: string
    icon?: {
      url: string
      public_id: string
    }
  }
  onEdit?: (technology: any) => void
  onDelete?: (techId: string) => void
}

export function TechnologyCard({
  technology,
  onEdit,
  onDelete,
}: TechnologyCardProps) {
  return (
    <Card className="flex flex-col items-center justify-between p-6 text-center">
      {/* Icon Section */}
      {technology.icon?.url && (
        <div className="mb-4 h-16 w-16 overflow-hidden rounded-lg bg-muted">
          <img
            src={technology.icon.url}
            alt={technology.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <CardHeader className="p-0">
        <h3 className="line-clamp-1 text-lg font-semibold">
          {technology.name || "Untitled"}
        </h3>
      </CardHeader>

      <CardContent className="p-2">
        <Badge variant="outline" className="capitalize">
          {technology.category}
        </Badge>
      </CardContent>

      {/* Footer with Action Buttons */}
      <CardFooter className="mt-4 flex w-full justify-center gap-2 p-0">
        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(technology)}
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
                onClick={() => onDelete(technology.name || "technology")}
                className="gap-1"
              >
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
