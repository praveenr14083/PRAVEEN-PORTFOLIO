import React from "react"
import { FileX } from "lucide-react"

interface NotFoundProps {
  title?: string
  description?: string
}

export const NotFound = ({
  title = "No data found",
  description = "There's nothing to display here",
}: NotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-20 text-center">
      <FileX className="mb-4 h-12 w-12 text-muted-foreground opacity-50" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
