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
import { X, Upload, Loader2 } from "lucide-react"
import { useUpdateCertificate } from "../hooks/useCertificates"
import { certificateSchema, CertificateInput } from "../validation/certificate.validation"
import { ZodError } from "zod"
import { toast } from "sonner"

type EditCertificateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  certificate?: (CertificateInput & { _id: string, image?: { url: string; public_id: string } }) | any | null
}

export function EditCertificateModal({
  open,
  onOpenChange,
  certificate,
}: EditCertificateModalProps) {
  const [formData, setFormData] = useState<CertificateInput>({
    name: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: updateCertificateDetails, isPending } = useUpdateCertificate()

  useEffect(() => {
    if (certificate) {
      setFormData({
        name: certificate.name || "",
      })
      if (certificate.image?.url) {
        setPreviewUrl(certificate.image.url)
      } else {
        setPreviewUrl("")
      }
      setImageFile(null)
      setErrors({})
    }
  }, [certificate])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!certificate?._id) return

    setErrors({})
    try {
      certificateSchema.parse(formData)
      
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value))
      })
      if (imageFile) {
        submitData.append("image", imageFile)
      }
      
      updateCertificateDetails({ id: certificate._id, formData: submitData }, {
        onSuccess: () => {
          onOpenChange(false)
        }
      })
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.issues.forEach((e) => {
          if (e.path[0]) {
            fieldErrors[e.path[0].toString()] = e.message
          }
        })
        setErrors(fieldErrors)
        toast.error("Please fill in all required fields correctly")
      }
    }
  }

  const resetForm = () => {
    if (certificate) {
      setFormData({
        name: certificate.name || "",
      })
      if (certificate.image?.url) {
        setPreviewUrl(certificate.image.url)
      } else {
        setPreviewUrl("")
      }
      setImageFile(null)
      setErrors({})
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
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
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

              {previewUrl ? (
                <div className="relative w-full">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setImageFile(null)
                      setPreviewUrl("")
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
              disabled={isPending}
              onClick={() => {
                onOpenChange(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
               {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
               Update Certificate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
