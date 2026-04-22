"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateTechnologyModal } from "../components/CreateTechnologyModal"
import { EditTechnologyModal } from "../components/EditTechnologyModal"
import { TechnologyCard } from "../components/TechnologyCard"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { RotateCcw, ChevronDown } from "lucide-react"
import { useTechnologies, useDeleteTechnology } from "../hooks/useTechnologies"
import { Skeleton } from "@/components/ui/skeleton"

export default function TechnologiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedTechnology, setSelectedTechnology] = useState<any | null>(null)

  const { data: technologies = [], isLoading } = useTechnologies()
  const { mutate: deleteTechnology } = useDeleteTechnology()

  const categories = [
    "All Categories",
    "frontend",
    "backend",
    "database",
    "tools",
  ]

  const handleReset = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
  }

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      tech.category === selectedCategory
    const matchesSearch = tech.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleEdit = (technology: any) => {
    setSelectedTechnology(technology)
    setEditOpen(true)
  }

  const handleDelete = (techId: string) => {
    if (confirm("Are you sure you want to delete this technology?")) {
      deleteTechnology(techId)
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

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-between">
              <span className="capitalize">{selectedCategory}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[180px]">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="capitalize">{category}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No technologies found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchTerm || selectedCategory !== "All Categories"
              ? "Try adjusting your filters"
              : "Add your first technology"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <EditTechnologyModal
        open={editOpen}
        onOpenChange={setEditOpen}
        technology={selectedTechnology}
      />
    </section>
  )
}
