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
import { Plus } from "lucide-react"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Skill Form Data:", formData)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "code",
      technologies: "",
    })
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
              required
              minLength={2}
            />
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
              onClick={() => {
                setOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create Skill</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
