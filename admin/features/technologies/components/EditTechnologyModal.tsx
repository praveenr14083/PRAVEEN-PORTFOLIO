"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES } from "@/utils/constants"
import { Loader2, Upload, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { ZodError } from "zod"
import { useUpdateTechnology } from "../hooks/useTechnologies"
import { technologySchema } from "../validation/technology.validation"

type TechnologyFormData = {
  name: string
  category: string
}

type EditTechnologyModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  technology?:
    | (TechnologyFormData & {
        _id: string
        icon?: { url: string; public_id: string }
      })
    | any
    | null
}

export function EditTechnologyModal({
  open,
  onOpenChange,
  technology,
}: EditTechnologyModalProps) {
  const [formData, setFormData] = useState<TechnologyFormData>({
    name: "",
    category: CATEGORIES[0],
  })

  const [iconFile, setIconFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [removeIcon, setRemoveIcon] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: updateTechnologyDetails, isPending } = useUpdateTechnology()

  const categories = CATEGORIES

  useEffect(() => {
    if (technology) {
      setFormData({
        name: technology.name || "",
        category: technology.category || CATEGORIES[0],
      })
      if (technology.icon?.url) {
        setPreviewUrl(technology.icon.url)
        setRemoveIcon(false)
      } else {
        setPreviewUrl("")
        setRemoveIcon(false)
      }
      setIconFile(null)
      setErrors({})
    }
  }, [technology])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIconFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setRemoveIcon(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!technology?._id) return

    setErrors({})
    try {
      technologySchema.parse(formData)

      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value))
      })
      if (iconFile) {
        submitData.append("icon", iconFile)
      } else if (removeIcon) {
        submitData.append("removeIcon", "true")
      }

      console.log(
        "Frontend: Submitting FormData for technology:",
        Array.from((submitData as any).entries())
      )

      updateTechnologyDetails(
        { id: technology._id, formData: submitData },
        {
          onSuccess: () => {
            onOpenChange(false)
          },
        }
      )
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
    if (technology) {
      setFormData({
        name: technology.name || "",
        category: technology.category || CATEGORIES[0],
      })
      if (technology.icon?.url) {
        setPreviewUrl(technology.icon.url)
        setRemoveIcon(false)
      } else {
        setPreviewUrl("")
        setRemoveIcon(false)
      }
      setIconFile(null)
      setErrors({})
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Technology</DialogTitle>
          <DialogDescription>
            Modify the technology details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-tech-name">Technology Name *</Label>
            <Input
              id="edit-tech-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., React, Node.js, PostgreSQL"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="edit-tech-category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: any) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Icon Upload */}
          <div className="space-y-2">
            <Label>Technology Icon</Label>
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted"
              onClick={() =>
                document.getElementById("edit-tech-icon-upload")?.click()
              }
            >
              <input
                id="edit-tech-icon-upload"
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
                    className="h-32 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIconFile(null)
                      setPreviewUrl("")
                      setRemoveIcon(true)
                    }}
                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-4 py-8">
                  <div className="mb-4 rounded-full bg-primary p-3">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to upload icon
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
              Update Technology
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
