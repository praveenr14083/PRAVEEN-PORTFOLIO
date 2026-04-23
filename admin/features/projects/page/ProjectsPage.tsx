"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateProjectModal } from "../components/CreateProjectModal"
import { EditProjectModal } from "../components/EditProjectModal"
import { ProjectCard } from "../components/ProjectCard"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { RotateCcw, ChevronDown, RotateCw } from "lucide-react"
import { useProjects, useDeleteProject } from "../hooks/useProjects"
import { Skeleton } from "@/components/ui/skeleton"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { NotFound } from "@/components/common/NotFound"

type ProjectFormData = {
  title: string
  description: string
  technologies: string
  category: string
  status: "draft" | "published"
  featured: boolean
  liveUrl: string
  githubUrl: string
  image: {
    url: string
    public_id: string
  }
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const { data: projects = [], isLoading, refetch } = useProjects()
  const { mutate: deleteProject } = useDeleteProject()

  const categories = [
    "All Categories",
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Backend",
    "Full Stack",
    "Other",
  ]

  const statuses = [
    { value: "All Status", label: "All Status" },
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ]

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status)
  }

  const handleReset = () => {
    setSelectedCategory("All Categories")
    setSelectedStatus("All Status")
    setSearchTerm("")
    refetch()
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteProject(deleteId)
      setDeleteConfirmOpen(false)
      setDeleteId(null)
    }
  }

  // Filter projects based on selections
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      project.category === selectedCategory
    const matchesStatus =
      selectedStatus === "All Status" || project.status === selectedStatus
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col gap-4">
        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="min-w-[200px] flex-1">
            <Input
              placeholder="Search projects..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter - DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                <span>{selectedCategory}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter - DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-between">
                <span>
                  {selectedStatus === "All Status"
                    ? "All Status"
                    : statuses.find((s) => s.value === selectedStatus)?.label}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
              {statuses.map((status) => (
                <DropdownMenuItem
                  key={status.value}
                  onClick={() => handleStatusSelect(status.value)}
                >
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reload Button */}
          <Button variant="outline" className="gap-2" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          {/* Create Project Button */}
          <CreateProjectModal />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project: any) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={(project) => {
                setSelectedProject({
                  ...project,
                  technologies: project.technologies?.join(", ") || "",
                })
                setEditOpen(true)
              }}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full">
            <NotFound
              title="No projects found"
              description="Create your first project to get started"
            />
          </div>
        )}
      </div>

      {/* Edit Project Modal */}
      <EditProjectModal
        open={editOpen}
        onOpenChange={setEditOpen}
        project={selectedProject}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}
