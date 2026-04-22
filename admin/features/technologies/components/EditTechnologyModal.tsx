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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Upload } from "lucide-react"

type TechnologyFormData = {
  name: string
  category: "frontend" | "backend" | "database" | "tools"
  icon: {
    url: string
    public_id: string
  }
}

type EditTechnologyModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  technology?: TechnologyFormData | null
}

export function EditTechnologyModal({
  open,
  onOpenChange,
  technology,
}: EditTechnologyModalProps) {
  const [formData, setFormData] = useState<TechnologyFormData>({
    name: "",
    category: "frontend",
    icon: {
      url: "",
      public_id: "",
    },
  })

  const categories = ["frontend", "backend", "database", "tools"]

  useEffect(() => {
    if (technology) {
      setFormData(technology)
    }
  }, [technology])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        icon: {
          url: previewUrl,
          public_id: "",
        },
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated Technology:", formData)
    onOpenChange(false)
  }

  const resetForm = () => {
    if (technology) {
      setFormData(technology)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Technology</DialogTitle>
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
              required
            />
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
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
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

              {formData.icon.url ? (
                <div className="relative w-full">
                  <img
                    src={formData.icon.url}
                    alt="Preview"
                    className="h-32 w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFormData((prev) => ({
                        ...prev,
                        icon: { url: "", public_id: "" },
                      }))
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
              onClick={() => {
                onOpenChange(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Update Technology</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
