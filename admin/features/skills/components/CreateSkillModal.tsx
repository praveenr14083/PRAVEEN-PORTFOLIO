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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Loader2 } from "lucide-react"
import { useCreateSkill } from "../hooks/useSkills"
import { skillSchema, SkillInput } from "../validation/skill.validation"
import { ZodError } from "zod"
import { toast } from "sonner"

type SkillFormData = {
  name: string
  description: string
  icon: string
  technologies: string
}

export function CreateSkillModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    description: "",
    icon: "code",
    technologies: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: createSkill, isPending } = useCreateSkill()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

      createSkill(skillData, {
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
      description: "",
      icon: "code",
      technologies: "",
    })
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Create New Skill</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input
              id="name"
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter skill description"
              rows={4}
            />
          </div>

          {/* Icon Input - Changed from dropdown to normal input */}
          <div className="space-y-2">
            <Label htmlFor="icon">Icon Name</Label>
            <Input
              id="icon"
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
            <Label htmlFor="technologies">Related Technologies</Label>
            <Input
              id="technologies"
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
                setOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Skill
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
