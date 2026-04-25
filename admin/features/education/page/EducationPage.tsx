"use client"

import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { NotFound } from "@/components/common/NotFound"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { RotateCcw } from "lucide-react"
import { useState } from "react"
import { CreateEducationModal } from "../components/CreateEducationModal"
import { EditEducationModal } from "../components/EditEducationModal"
import { EducationCard } from "../components/EducationCard"
import { useDeleteEducation, useEducation } from "../hooks/useEducation"

type EducationFormData = {
  degree: string
  institute: string
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  grade: string
  gradeType: string
}

export default function EducationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedEducation, setSelectedEducation] = useState<any | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const { data: educationList = [], isLoading, refetch } = useEducation()
  const { mutate: deleteEducation } = useDeleteEducation()

  const handleReset = () => {
    setSearchTerm("")
    refetch()
  }

  const filteredEducation = educationList.filter(
    (edu) =>
      edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.institute.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (education: any) => {
    setSelectedEducation(education)
    setEditOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteEducation(deleteId)
      setDeleteConfirmOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search education..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw />
        </Button>
        <CreateEducationModal />
      </div>

      {/* Education List */}
      {isLoading ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredEducation.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEducation.map((education, index) => (
            <EducationCard
              key={index}
              education={education}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <NotFound
            title="No education found"
            description={
              searchTerm
                ? "Try adjusting your search terms"
                : "Add your education details"
            }
          />
        </div>
      )}

      {/* Edit Modal */}
      <EditEducationModal
        open={editOpen}
        onOpenChange={setEditOpen}
        education={selectedEducation}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Education"
        description="Are you sure you want to delete this education record? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}
