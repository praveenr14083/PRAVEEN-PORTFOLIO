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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"

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

export function CreateExperienceModal() {
  const [open, setOpen] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Experience Data:", formData)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      role: "",
      company: "",
      location: "",
      employmentType: "Full-Time",
      description: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Work Experience</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Job Title *</Label>
            <Input
              id="role"
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
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
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
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., New York, USA"
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment Type *</Label>
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
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
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
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
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
                  id="isCurrent"
                  checked={formData.isCurrent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isCurrent: checked })
                  }
                />
                <Label htmlFor="isCurrent" className="mb-0">
                  Currently Working
                </Label>
              </div>
            </div>
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
                setOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Experience</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
