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

type EducationFormData = {
  degree: string
  institute: string
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  grade: string
  gradeType: "CGPA" | "Percentage" | "GPA"
}

export function CreateEducationModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<EducationFormData>({
    degree: "",
    institute: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    grade: "",
    gradeType: "CGPA",
  })

  const gradeTypes = ["CGPA", "Percentage", "GPA"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Education Data:", formData)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      degree: "",
      institute: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      grade: "",
      gradeType: "CGPA",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Education
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Education</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Degree */}
          <div className="space-y-2">
            <Label htmlFor="degree">Degree *</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              placeholder="e.g., Bachelor of Science in Computer Science"
              required
            />
          </div>

          {/* Institute */}
          <div className="space-y-2">
            <Label htmlFor="institute">Institute/University *</Label>
            <Input
              id="institute"
              value={formData.institute}
              onChange={(e) =>
                setFormData({ ...formData, institute: e.target.value })
              }
              placeholder="e.g., XYZ University"
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
                  Currently Studying
                </Label>
              </div>
            </div>
          </div>

          {/* Grade */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Score</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                placeholder="e.g., 3.8"
              />
            </div>

            {/* Grade Type */}
            <div className="space-y-2">
              <Label htmlFor="gradeType">Grade Type</Label>
              <Select
                value={formData.gradeType}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, gradeType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradeTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Button type="submit">Add Education</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
