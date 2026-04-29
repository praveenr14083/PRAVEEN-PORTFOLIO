"use client"

import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { NotFound } from "@/components/common/NotFound"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { RotateCcw } from "lucide-react"
import { useState } from "react"
import { CreateTechnologyModal } from "../components/CreateTechnologyModal"
import { EditTechnologyModal } from "../components/EditTechnologyModal"
import { TechnologyCard } from "../components/TechnologyCard"
import { useDeleteTechnology, useTechnologies } from "../hooks/useTechnologies"

export default function TechnologiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedTechnology, setSelectedTechnology] = useState<any | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const { data: technologies = [], isLoading, refetch } = useTechnologies()
  const { mutate: deleteTechnology } = useDeleteTechnology()

  const handleReset = () => {
    setSearchTerm("")
    refetch()
  }

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesSearch = tech.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleEdit = (technology: any) => {
    setSelectedTechnology(technology)
    setEditOpen(true)
  }

  const handleDelete = (techId: string) => {
    setDeleteId(techId)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteTechnology(deleteId)
      setDeleteConfirmOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button variant="outline" onClick={handleReset}>
          <RotateCcw />
        </Button>

        <CreateTechnologyModal />
      </div>

      {/* Technologies Grid */}
      {isLoading ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredTechnologies.length > 0 ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredTechnologies.map((technology, index) => (
            <TechnologyCard
              key={index}
              technology={technology}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <NotFound
            title="No technologies found"
            description={
              searchTerm
                ? "Try adjusting your filters"
                : "Add your first technology"
            }
          />
        </div>
      )}

      {/* Edit Modal */}
      <EditTechnologyModal
        open={editOpen}
        onOpenChange={setEditOpen}
        technology={selectedTechnology}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Technology"
        description="Are you sure you want to delete this technology? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}
