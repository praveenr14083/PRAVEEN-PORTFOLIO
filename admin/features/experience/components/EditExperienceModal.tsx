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
import { Loader2 } from "lucide-react"
import { useUpdateExperience } from "../hooks/useExperience"
import { experienceSchema, ExperienceInput } from "../validation/experience.validation"
import { ZodError } from "zod"
import { toast } from "sonner"

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
  experience?: (ExperienceInput & { _id: string }) | any | null
}

export function EditExperienceModal({
  open,
  onOpenChange,
  experience,
}: EditExperienceModalProps) {
  const [formData, setFormData] = useState<ExperienceInput>({
    role: "",
    company: "",
    location: "",
    employmentType: "Full-Time",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { mutate: updateExperienceDetails, isPending } = useUpdateExperience()

  const employmentTypes = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
    "Freelance",
  ]

  const formatDateForInput = (dateString: string | undefined | null) => {
    if (!dateString) return ""
    return dateString.split("T")[0]
  }

  useEffect(() => {
    if (experience) {
      setFormData({
        role: experience.role || "",
        company: experience.company || "",
        location: experience.location || "",
        employmentType: (experience.employmentType as any) || "Full-Time",
        description: experience.description || "",
        startDate: formatDateForInput(experience.startDate),
        endDate: formatDateForInput(experience.endDate),
        isCurrent: experience.isCurrent || false,
      })
      setErrors({})
    }
  }, [experience])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!experience?._id) return

    setErrors({})
    try {
      const dataToParse = {
        ...formData,
        endDate: formData.isCurrent ? null : (formData.endDate || null),
      }
      experienceSchema.parse(dataToParse)

      updateExperienceDetails(
        { id: experience._id, experienceData: dataToParse },
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
    if (experience) {
      setFormData({
        role: experience.role || "",
        company: experience.company || "",
        location: experience.location || "",
        employmentType: (experience.employmentType as any) || "Full-Time",
        description: experience.description || "",
        startDate: formatDateForInput(experience.startDate),
        endDate: formatDateForInput(experience.endDate),
        isCurrent: experience.isCurrent || false,
      })
      setErrors({})
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
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role}</p>
            )}
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
            />
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company}</p>
            )}
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
            />
            {errors.startDate && (
              <p className="text-sm text-red-500">{errors.startDate}</p>
            )}
          </div>

          {/* End Date & Is Current */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-endDate">End Date</Label>
              <Input
                id="edit-endDate"
                type="date"
                value={formData.endDate || ""}
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
              Update Experience
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
