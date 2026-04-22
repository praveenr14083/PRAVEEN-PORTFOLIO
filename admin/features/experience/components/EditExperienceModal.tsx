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

type ExperienceFormData = {
  role: string
  company: string
  location: string
  employmentType:
    | "Full-Time"
    | "Part-Time"
    | "Internship"
    | "Contract"
    | "Freelance"
  description: string
  startDate: string
  endDate: string
  isCurrent: boolean
}

type EditExperienceModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  experience?: ExperienceFormData | null
}

export function EditExperienceModal({
  open,
  onOpenChange,
  experience,
}: EditExperienceModalProps) {
  const [formData, setFormData] = useState<ExperienceFormData>({
    role: "",
    company: "",
    location: "",
    employmentType: "Full-Time",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  })

  const employmentTypes = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
    "Freelance",
  ]

  useEffect(() => {
    if (experience) {
      setFormData(experience)
    }
  }, [experience])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated Experience:", formData)
    onOpenChange(false)
  }

  const resetForm = () => {
    if (experience) {
      setFormData(experience)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Work Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="edit-role">Job Title *</Label>
            <Input
              id="edit-role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="edit-company">Company *</Label>
            <Input
              id="edit-company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="e.g., Tech Company Inc."
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="edit-location">Location</Label>
            <Input
              id="edit-location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., New York, USA"
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="edit-employmentType">Employment Type *</Label>
            <Select
              value={formData.employmentType}
              onValueChange={(value: any) =>
                setFormData({ ...formData, employmentType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {employmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="edit-startDate">Start Date *</Label>
            <Input
              id="edit-startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
            />
          </div>

          {/* End Date & Is Current */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-endDate">End Date</Label>
              <Input
                id="edit-endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                disabled={formData.isCurrent}
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-isCurrent"
                  checked={formData.isCurrent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isCurrent: checked })
                  }
                />
                <Label htmlFor="edit-isCurrent" className="mb-0">
                  Currently Working
                </Label>
              </div>
            </div>
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
              placeholder="Describe your responsibilities and achievements"
              rows={4}
            />
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
            <Button type="submit">Update Experience</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
