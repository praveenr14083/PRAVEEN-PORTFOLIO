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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CATEGORIES } from "@/utils/constants"
import { Loader2, Plus, Upload, X } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import { ZodError } from "zod"
import { useCreateProject } from "../hooks/useProjects"
import { ProjectInput, projectSchema } from "../validation/project.validation"

export function CreateProjectModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<ProjectInput>({
    title: "",
    description: "",
    technologies: "",
    category: CATEGORIES[0],
    status: "draft",
    featured: false,
    liveUrl: "",
    githubUrl: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: createProject, isPending } = useCreateProject()

  const categories = CATEGORIES

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    try {
      projectSchema.parse(formData)

      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value))
      })
      if (imageFile) {
        submitData.append("image", imageFile)
      }

      createProject(submitData, {
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
      title: "",
      description: "",
      technologies: "",
      category: CATEGORIES[0],
      status: "draft",
      featured: false,
      liveUrl: "",
      githubUrl: "",
    })
    setImageFile(null)
    setPreviewUrl("")
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new project to your portfolio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter project title"
            />
            {errors.title && (
              <span className="text-sm text-red-500">{errors.title}</span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter project description"
              rows={4}
            />
            {errors.description && (
              <span className="text-sm text-red-500">{errors.description}</span>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
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

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              placeholder="Enter technologies (e.g., React, Node.js, TypeScript)"
            />
            {errors.technologies && (
              <span className="text-sm text-red-500">
                {errors.technologies}
              </span>
            )}
          </div>

          {/* Live URL */}
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={(e) =>
                setFormData({ ...formData, liveUrl: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          {/* GitHub URL */}
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Project Image</Label>

            {/* Upload Rectangle */}
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {previewUrl ? (
                // Preview mode
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
                // Upload prompt mode
                <div className="flex flex-col items-center justify-center px-4 py-12">
                  <div className="mb-4 rounded-full bg-primary p-3">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-md text-muted-foreground">
                    Click to upload image
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "draft" | "published") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured</Label>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
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
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
