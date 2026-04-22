"use client"

import React, { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pen, Trash } from "lucide-react"

type CertificateCardProps = {
  certificate: {
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
    <Card className="group overflow-hidden">
      {/* Image Section */}
      {certificate.image?.url && (
        <div
          className="relative h-48 w-full overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={certificate.image.url}
            alt={certificate.name || "Certificate"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content Section */}
      <CardContent className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold">
          {certificate.name || "Untitled Certificate"}
        </h3>
      </CardContent>

      {/* Footer with Action Buttons */}
      <CardFooter className="flex items-center justify-between gap-2 p-4">
        {(onEdit || onDelete) && (
          <div className="flex w-full justify-end gap-2">
            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(certificate)}
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
                onClick={() => onDelete(certificate.name || "certificate")}
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
