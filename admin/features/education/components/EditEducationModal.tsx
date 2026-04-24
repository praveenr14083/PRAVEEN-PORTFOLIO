"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Loader2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { ZodError } from "zod"
import { useUpdateEducation } from "../hooks/useEducation"
import {
  EducationInput,
  educationSchema,
} from "../validation/education.validation"

type EditEducationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  education?: (EducationInput & { _id: string }) | any | null
}

export function EditEducationModal({
  open,
  onOpenChange,
  education,
}: EditEducationModalProps) {
  const [formData, setFormData] = useState<EducationInput>({
    degree: "",
    institute: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    grade: "",
    gradeType: "CGPA",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const gradeTypes = ["CGPA", "Percentage", "GPA"]
  const { mutate: updateEducationDetails, isPending } = useUpdateEducation()

  const formatDateForInput = (dateString: string | undefined | null) => {
    if (!dateString) return ""
    return dateString.split("T")[0]
  }

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree || "",
        institute: education.institute || "",
        location: education.location || "",
        startDate: formatDateForInput(education.startDate),
        endDate: formatDateForInput(education.endDate),
        isCurrent: education.isCurrent || false,
        grade: education.grade || "",
        gradeType:
          (education.gradeType as "CGPA" | "Percentage" | "GPA") || "CGPA",
      })
      setErrors({})
    }
  }, [education])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!education?._id) return

    setErrors({})
    try {
      const dataToParse = {
        ...formData,
        endDate: formData.isCurrent ? null : formData.endDate || null,
      }
      educationSchema.parse(dataToParse)

      updateEducationDetails(
        { id: education._id, educationData: dataToParse },
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
    if (education) {
      setFormData({
        degree: education.degree || "",
        institute: education.institute || "",
        location: education.location || "",
        startDate: formatDateForInput(education.startDate),
        endDate: formatDateForInput(education.endDate),
        isCurrent: education.isCurrent || false,
        grade: education.grade || "",
        gradeType:
          (education.gradeType as "CGPA" | "Percentage" | "GPA") || "CGPA",
      })
      setErrors({})
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Education</DialogTitle>
          <DialogDescription>
            Update your academic qualification details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Degree */}
          <div className="space-y-2">
            <Label htmlFor="edit-degree">Degree *</Label>
            <Input
              id="edit-degree"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              placeholder="e.g., Bachelor of Science in Computer Science"
            />
            {errors.degree && (
              <p className="text-sm text-red-500">{errors.degree}</p>
            )}
          </div>

          {/* Institute */}
          <div className="space-y-2">
            <Label htmlFor="edit-institute">Institute/University *</Label>
            <Input
              id="edit-institute"
              value={formData.institute}
              onChange={(e) =>
                setFormData({ ...formData, institute: e.target.value })
              }
              placeholder="e.g., XYZ University"
            />
            {errors.institute && (
              <p className="text-sm text-red-500">{errors.institute}</p>
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
                  Currently Studying
                </Label>
              </div>
            </div>
          </div>

          {/* Grade */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-grade">Grade/Score</Label>
              <Input
                id="edit-grade"
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                placeholder="e.g., 3.8"
              />
            </div>

            {/* Grade Type */}
            <div className="space-y-2">
              <Label htmlFor="edit-gradeType">Grade Type</Label>
              <Select
                value={formData.gradeType}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, gradeType: value })
                }
              >
                <SelectTrigger className="w-full">
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
              Update Education
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
