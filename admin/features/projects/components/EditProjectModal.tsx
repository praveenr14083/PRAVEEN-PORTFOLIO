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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, Upload, Loader2 } from "lucide-react"
import { useUpdateProject } from "../hooks/useProjects"
import { projectSchema, ProjectInput } from "../validation/project.validation"
import { ZodError } from "zod"
import { toast } from "sonner"

type EditProjectModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: (ProjectInput & { _id: string, image?: { url: string; public_id: string } }) | any | null
}

export function EditProjectModal({
  open,
  onOpenChange,
  project,
}: EditProjectModalProps) {
  const [formData, setFormData] = useState<ProjectInput>({
    title: "",
    description: "",
    technologies: "",
    category: "Other",
    status: "draft",
    featured: false,
    liveUrl: "",
    githubUrl: "",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: updateProjectDetails, isPending } = useUpdateProject()

  const categories = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Backend",
    "Full Stack",
    "Other",
  ]

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "",
        category: project.category || "Other",
        status: project.status || "draft",
        featured: project.featured || false,
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
      })
      if (project.image?.url) {
        setPreviewUrl(project.image.url)
      } else {
        setPreviewUrl("")
      }
      setImageFile(null)
      setErrors({})
    }
  }, [project])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!project?._id) return

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
      
      updateProjectDetails({ id: project._id, formData: submitData }, {
        onSuccess: () => {
          onOpenChange(false)
        }
      })
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.issues.forEach(e => {
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
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "",
        category: project.category || "Other",
        status: project.status || "draft",
        featured: project.featured || false,
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
      })
      if (project.image?.url) {
        setPreviewUrl(project.image.url)
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
          <DialogTitle className="font-bold">Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter project title"
            />
            {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter project description"
              rows={4}
            />
            {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="edit-category">Category</Label>
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
            <Label htmlFor="edit-technologies">Technologies</Label>
            <Input
              id="edit-technologies"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              placeholder="Enter technologies (e.g., React, Node.js, TypeScript)"
            />
            {errors.technologies && <span className="text-sm text-red-500">{errors.technologies}</span>}
          </div>

          {/* Live URL */}
          <div className="space-y-2">
            <Label htmlFor="edit-liveUrl">Live URL</Label>
            <Input
              id="edit-liveUrl"
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
            <Label htmlFor="edit-githubUrl">GitHub URL</Label>
            <Input
              id="edit-githubUrl"
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
            <div
              className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed bg-muted"
              onClick={() =>
                document.getElementById("edit-image-upload")?.click()
              }
            >
              <input
                id="edit-image-upload"
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
                    Click to upload image
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
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
              <Label htmlFor="edit-featured">Featured</Label>
              <Switch
                id="edit-featured"
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
                onOpenChange(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
