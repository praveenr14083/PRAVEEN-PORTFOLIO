"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Loader2, Plus, Upload, X } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import { ZodError } from "zod"
import { useCreateTechnology } from "../hooks/useTechnologies"
import { technologySchema } from "../validation/technology.validation"

type TechnologyFormData = {
  name: string
  category: string
}

export function CreateTechnologyModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<TechnologyFormData>({
    name: "",
    category: CATEGORIES[0],
  })

  const [iconFile, setIconFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: createTechnology, isPending } = useCreateTechnology()

  const categories = [...CATEGORIES, "Others"]
  const [showCustomCategory, setShowCustomCategory] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIconFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    try {
      technologySchema.parse(formData)
      if (!iconFile) {
        toast.error("Please upload an icon")
        return
      }

      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value))
      })
      submitData.append("icon", iconFile)

      createTechnology(submitData, {
        onSuccess: () => {
          setOpen(false)
          resetForm()
        },
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
    setFormData({
      name: "",
      category: CATEGORIES[0],
    })
    setShowCustomCategory(false)
    setIconFile(null)
    setPreviewUrl("")
    setErrors({})
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
          <DialogDescription>
            Add a specific tool or language you use (e.g. "React", "Node.js").
          </DialogDescription>
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
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="tech-category">Category *</Label>
            <Select
              value={showCustomCategory ? "Others" : formData.category}
              onValueChange={(value: any) => {
                if (value === "Others") {
                  setShowCustomCategory(true)
                  setFormData({ ...formData, category: "" })
                } else {
                  setShowCustomCategory(false)
                  setFormData({ ...formData, category: value })
                }
              }}
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
            {showCustomCategory && (
              <Input
                placeholder="Enter custom category"
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value })
                }}
                className="mt-2"
              />
            )}
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
                setOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Technology
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
