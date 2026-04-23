"use client"

import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { NotFound } from "@/components/common/NotFound"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { RotateCcw } from "lucide-react"
import { useState } from "react"
import { CreateExperienceModal } from "../components/CreateExperienceModal"
import { EditExperienceModal } from "../components/EditExperienceModal"
import { ExperienceCard } from "../components/ExperienceCard"
import { useDeleteExperience, useExperience } from "../hooks/useExperience"

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
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredExperience.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="mt-4">
          <NotFound
            title="No experience found"
            description={
              searchTerm
                ? "Try adjusting your search terms"
                : "Add your work experience"
            }
          />
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
