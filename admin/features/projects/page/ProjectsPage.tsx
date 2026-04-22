"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateProjectModal } from "../components/CreateProjectModal"
import { ProjectCard } from "../components/ProjectCard"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { RotateCcw, ChevronDown } from "lucide-react"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [searchTerm, setSearchTerm] = useState("")

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      status: "published",
      featured: true,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/repo",
      image: "https://via.placeholder.com/400x200",
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website with animations",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      category: "Web Development",
      status: "published",
      featured: false,
      liveUrl: "https://portfolio.com",
      githubUrl: "https://github.com/example/portfolio",
      image: "https://via.placeholder.com/400x200",
    },
    {
      title: "Mobile Chat App",
      description: "Real-time chat application for mobile devices",
      technologies: ["React Native", "Firebase", "Socket.io"],
      category: "Mobile App",
      status: "draft",
      featured: false,
      image: "https://via.placeholder.com/400x200",
    },
  ]

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
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            onEdit={(project) => console.log("Edit:", project)}
            onDelete={(id) => console.log("Delete:", id)}
          />
        ))}
      </div>
    </section>
  )
}
