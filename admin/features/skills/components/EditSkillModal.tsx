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

type SkillFormData = {
  name: string
  description: string
  icon: string
  technologies: string
}

type EditSkillModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  skill?: SkillFormData | null
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
      setFormData(skill)
    }
  }, [skill])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated Skill Data:", formData)
    onOpenChange(false)
  }

  const resetForm = () => {
    if (skill) {
      setFormData(skill)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Skill</DialogTitle>
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
              required
              minLength={2}
            />
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
              onClick={() => {
                onOpenChange(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Update Skill</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
