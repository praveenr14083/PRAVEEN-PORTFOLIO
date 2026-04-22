"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pen, Trash } from "lucide-react"

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
    <Card className="group relative flex flex-col items-center justify-between overflow-hidden p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-muted/20 bg-card/50 backdrop-blur-sm">
      {/* Subtle Background Glow on Hover */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-all duration-500 group-hover:bg-primary/10" />
      
      {/* Icon Container */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted/30 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-muted/50 shadow-inner">
        {technology.icon?.url ? (
          <img
            src={technology.icon.url}
            alt={technology.name}
            className="h-full w-full object-contain drop-shadow-md"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl" />
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center gap-2 text-center z-10">
        <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {technology.name || "Untitled"}
        </h3>
        <Badge 
          variant="secondary" 
          className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20 border-none"
        >
          {technology.category || "General"}
        </Badge>
      </div>

      {/* Action Buttons - More refined */}
      <div className="mt-8 flex w-full gap-3 transition-all duration-300">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit?.(technology)}
          className="flex-1 rounded-xl font-semibold transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
        >
          <Pen className="mr-2 h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete?.(technology._id || "")}
          className="rounded-xl border-destructive/20 text-destructive/80 hover:bg-destructive hover:text-destructive-foreground active:scale-95 px-3"
        >
          <Trash className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  )
}
