"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload } from "lucide-react"

type CertificateFormData = {
  name: string
  image: {
    url: string
    public_id: string
  }
}

type EditCertificateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  certificate?: CertificateFormData | null
}

export function EditCertificateModal({
  open,
  onOpenChange,
  certificate,
}: EditCertificateModalProps) {
  const [formData, setFormData] = useState<CertificateFormData>({
    name: "",
    image: {
      url: "",
      public_id: "",
    },
  })

  useEffect(() => {
    if (certificate) {
      setFormData(certificate)
    }
  }, [certificate])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        image: {
          url: previewUrl,
          public_id: "",
        },
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated Certificate:", formData)
    onOpenChange(false)
  }

  const resetForm = () => {
    if (certificate) {
      setFormData(certificate)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Certificate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-cert-name">Certificate Name *</Label>
            <Input
              id="edit-cert-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., AWS Certified Solutions Architect"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Certificate Image</Label>
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted"
              onClick={() =>
                document.getElementById("edit-cert-image-upload")?.click()
              }
            >
              <input
                id="edit-cert-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {formData.image.url ? (
                <div className="relative w-full">
                  <img
                    src={formData.image.url}
                    alt="Preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFormData((prev) => ({
                        ...prev,
                        image: { url: "", public_id: "" },
                      }))
                    }}
                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-4 py-12">
                  <div className="mb-4 rounded-full bg-primary p-3">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-md text-muted-foreground">
                    Click to upload certificate image
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Update Certificate</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
