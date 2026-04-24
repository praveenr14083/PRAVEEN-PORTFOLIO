"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Pen, Trash } from "lucide-react"
import { useState } from "react"

type CertificateCardProps = {
  certificate: {
    _id?: string
    name?: string
    image?: {
      url: string
      public_id: string
    }
  }
  onEdit?: (certificate: any) => void
  onDelete?: (certId: string) => void
}

export function CertificateCard({
  certificate,
  onEdit,
  onDelete,
}: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className="group overflow-hidden p-4">
      {/* Image Section */}
      <div
        className="relative h-48 w-full overflow-hidden rounded-lg bg-muted"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {certificate.image?.url ? (
          <img
            src={certificate.image.url}
            alt={certificate.name || "Certificate"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
             <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="h-12 w-12 rounded-full bg-muted p-3">
                <Pen className="h-full w-full stroke-[1.5px]" />
              </div>
              <span className="text-xs font-medium opacity-50 uppercase tracking-wider">No Certificate Image</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="px-0">
        <h3 className="line-clamp-2 text-lg font-semibold">
          {certificate.name || "Untitled Certificate"}
        </h3>
      </CardContent>

      {/* Footer with Action Buttons */}
      <CardFooter className="flex items-center justify-between gap-2 px-0">
        {(onEdit || onDelete) && (
          <div className="flex w-full justify-end gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(certificate)}
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
                onClick={() => onDelete(certificate._id || "")}
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
