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

type TechnologyFormData = {
  name: string
  category: "frontend" | "backend" | "database" | "tools"
  icon: {
    url: string
    public_id: string
  }
}

export default function TechnologiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedTechnology, setSelectedTechnology] =
    useState<TechnologyFormData | null>(null)

  // Sample technologies data
  const technologies = [
    {
      name: "React",
      category: "frontend" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
    {
      name: "Vue.js",
      category: "frontend" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
    {
      name: "Node.js",
      category: "backend" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
    {
      name: "Django",
      category: "backend" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
    {
      name: "MongoDB",
      category: "database" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
    {
      name: "PostgreSQL",
      category: "database" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
    {
      name: "Docker",
      category: "tools" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
    {
      name: "Git",
      category: "tools" as const,
      icon: { url: "https://via.placeholder.com/100", public_id: "" },
    },
  ]

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

  const handleDelete = (techName: string) => {
    console.log("Delete technology:", techName)
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
      {filteredTechnologies.length > 0 ? (
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
