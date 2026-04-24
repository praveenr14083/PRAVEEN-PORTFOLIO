"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { PanelsTopLeft, Pen, Trash } from "lucide-react"

type TechnologyCardProps = {
  technology: {
    _id?: string
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
    <Card className="flex flex-col overflow-hidden border-muted/20 bg-card/50 p-4">
      <CardHeader className="px-0">
        {/* Icon Container */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/30 p-4">
          {technology.icon?.url ? (
            <img
              src={technology.icon.url}
              alt={technology.name}
              className="h-full w-full object-contain drop-shadow-md"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PanelsTopLeft className="h-8 w-8 text-muted-foreground opacity-20" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="flex flex-col gap-1 text-left">
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {technology.name || "Untitled"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {technology.category || "General"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-0 pb-0">
        <div className="flex w-full gap-3 transition-all duration-300">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onEdit?.(technology)}
          >
            <Pen className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete?.(technology._id || "")}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
