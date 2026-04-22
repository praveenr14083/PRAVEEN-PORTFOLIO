"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Upload } from "lucide-react"

type CertificateFormData = {
  name: string
  image: {
    url: string
    public_id: string
  }
}

export function CreateCertificateModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<CertificateFormData>({
    name: "",
    image: {
      url: "",
      public_id: "",
    },
  })

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
    console.log("Certificate Data:", formData)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      image: {
        url: "",
        public_id: "",
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Add New Certificate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Certificate Name *</Label>
            <Input
              id="name"
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
            <Label>Certificate Image *</Label>
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted"
              onClick={() =>
                document.getElementById("cert-image-upload")?.click()
              }
            >
              <input
                id="cert-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                required
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
                  <p className="mt-2 text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
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
                setOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Certificate</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
