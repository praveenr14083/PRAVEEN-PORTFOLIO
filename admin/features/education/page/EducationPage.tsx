"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateEducationModal } from "../components/CreateEducationModal"
import { EditEducationModal } from "../components/EditEducationModal"
import { EducationCard } from "../components/EducationCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useEducation, useDeleteEducation } from "../hooks/useEducation"
import { Skeleton } from "@/components/ui/skeleton"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"

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

  const { data: educationList = [], isLoading } = useEducation()
  const { mutate: deleteEducation } = useDeleteEducation()

  const handleReset = () => {
    setSearchTerm("")
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
        <div className="mt-4 space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredEducation.length > 0 ? (
        <div className="mt-4 space-y-4">
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
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No education found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Add your education details"}
          </p>
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
