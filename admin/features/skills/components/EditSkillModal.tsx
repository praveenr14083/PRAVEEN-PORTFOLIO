"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Loader2 } from "lucide-react"
import { useUpdateSkill } from "../hooks/useSkills"
import { skillSchema, SkillInput } from "../validation/skill.validation"
import { ZodError } from "zod"
import { toast } from "sonner"

type SkillFormData = {
  name: string
  description: string
  icon: string
  technologies: string
}

type EditSkillModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  skill?: (SkillFormData & { _id: string }) | any | null
}

export function EditSkillModal({
  open,
  onOpenChange,
  skill,
}: EditSkillModalProps) {
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    description: "",
    icon: "code",
    technologies: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: updateSkill, isPending } = useUpdateSkill()

  const iconOptions = [
    "code",
    "database",
    "palette",
    "cpu",
    "zap",
    "server",
    "shield",
    "layers",
  ]

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        description: skill.description || "",
        icon: skill.icon || "code",
        technologies: Array.isArray(skill.technologies)
          ? skill.technologies.join(",")
          : skill.technologies || "",
      })
      setErrors({})
    }
  }, [skill])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!skill?._id) return

    setErrors({})
    try {
      const technologiesArray = formData.technologies
        ? formData.technologies.split(",").map((tech) => tech.trim())
        : []

      const skillData: SkillInput = {
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        technologies: technologiesArray,
      }

      skillSchema.parse(skillData)

      updateSkill(
        { id: skill._id, skillData },
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
    if (skill) {
      setFormData({
        name: skill.name || "",
        description: skill.description || "",
        icon: skill.icon || "code",
        technologies: Array.isArray(skill.technologies)
          ? skill.technologies.join(",")
          : skill.technologies || "",
      })
      setErrors({})
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Skill</DialogTitle>
          <DialogDescription>
            Modify your skill category details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Skill Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., React, TypeScript, etc."
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
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
              placeholder="Enter skill description"
              rows={4}
            />
          </div>

          {/* Icon Selection */}
          <div className="space-y-2">
            <Label htmlFor="edit-icon">Icon Name</Label>
            <Input
              id="edit-icon"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              placeholder="e.g., code, database, palette, cpu, zap, server, shield, layers"
            />
            <p className="text-xs text-muted-foreground">
              Enter any Lucide React icon name (e.g., code, database, palette,
              cpu, zap, server, shield, layers)
            </p>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="edit-technologies">Related Technologies</Label>
            <Input
              id="edit-technologies"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              placeholder="Enter technologies (comma-separated e.g., JavaScript, TypeScript)"
            />
            <p className="text-xs text-muted-foreground">
              Separate multiple technologies with commas
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2 pt-4">
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
              Update Skill
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
