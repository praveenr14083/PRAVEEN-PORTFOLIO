"use client"

import React, { useState } from "react"
import { StatsCard } from "../components/StatsCard"
import { FolderKanban, Code, GraduationCap, Plus } from "lucide-react"
import { ProjectTable } from "../components/ProjectTable"
import { Button } from "@/components/ui/button"
import { CreateProjectModal } from "@/features/projects/components/CreateProjectModal"

// Initial projects data
const initialProjects = [
  {
    title: "Portfolio Website",
    category: "Web Development",
    status: "published",
    featured: true,
    technologies: ["React", "Next.js", "Tailwind"],
  },
  {
    title: "Admin Dashboard",
    category: "Full Stack",
    status: "draft",
    featured: false,
    technologies: ["Node.js", "MongoDB"],
  },
]

export default function DashboardPage() {
  const [projects, setProjects] = useState(initialProjects)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">Hi, Praveen! 👋</h1>
        <CreateProjectModal />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          title="Projects"
          value={projects.length}
          icon={FolderKanban}
          description="Total projects"
        />

        <StatsCard
          title="Skills"
          value={25}
          icon={Code}
          description="Technologies known"
        />

        <StatsCard
          title="Education"
          value={3}
          icon={GraduationCap}
          description="Completed degrees"
        />

        <StatsCard
          title="Certificates"
          value={8}
          icon={GraduationCap}
          description="Achievements"
        />
      </div>

      <div className="mt-4">
        <ProjectTable data={projects} />
      </div>
    </section>
  )
}
