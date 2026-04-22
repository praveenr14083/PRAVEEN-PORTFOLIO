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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, X, Upload } from "lucide-react"

type TechnologyFormData = {
  name: string
  category: "frontend" | "backend" | "database" | "tools"
  icon: {
    url: string
    public_id: string
  }
}

export function CreateTechnologyModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<TechnologyFormData>({
    name: "",
    category: "frontend",
    icon: {
      url: "",
      public_id: "",
    },
  })

  const categories = ["frontend", "backend", "database", "tools"]

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
    console.log("Technology Data:", formData)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "frontend",
      icon: {
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
          Add Technology
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Add New Technology</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="tech-name">Technology Name *</Label>
            <Input
              id="tech-name"
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
            <Label htmlFor="tech-category">Category *</Label>
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
                document.getElementById("tech-icon-upload")?.click()
              }
            >
              <input
                id="tech-icon-upload"
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
                setOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Technology</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
