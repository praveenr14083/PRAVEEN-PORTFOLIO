"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateExperienceModal } from "../components/CreateExperienceModal"
import { EditExperienceModal } from "../components/EditExperienceModal"
import { ExperienceCard } from "../components/ExperienceCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useExperience, useDeleteExperience } from "../hooks/useExperience"
import { Skeleton } from "@/components/ui/skeleton"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"

type ExperienceFormData = {
  role: string
  company: string
  location: string
  employmentType: string
  description: string
  startDate: string
  endDate: string
  isCurrent: boolean
}

export default function ExperiencePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const { data: experiences = [], isLoading } = useExperience()
  const { mutate: deleteExperience } = useDeleteExperience()

  const handleReset = () => {
    setSearchTerm("")
  }

  const filteredExperience = experiences.filter(
    (exp) =>
      exp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (experience: any) => {
    setSelectedExperience(experience)
    setEditOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteExperience(deleteId)
      setDeleteConfirmOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search by role or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw />
        </Button>
        <CreateExperienceModal />
      </div>

      {/* Experience List */}
      {isLoading ? (
        <div className="mt-4 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredExperience.length > 0 ? (
        <div className="mt-4 space-y-4">
          {filteredExperience.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No experience found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Add your work experience"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <EditExperienceModal
        open={editOpen}
        onOpenChange={setEditOpen}
        experience={selectedExperience}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Experience"
        description="Are you sure you want to delete this experience record? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}
