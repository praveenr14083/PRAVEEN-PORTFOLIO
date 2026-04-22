"use client"

import React from "react"
import { StatsCard } from "../components/StatsCard"
import { FolderKanban, Code, BrainCircuit, Award } from "lucide-react"
import { ProjectTable } from "../components/ProjectTable"
import { CreateProjectModal } from "@/features/projects/components/CreateProjectModal"
import { useStats } from "../hooks/useStats"
import { useProjects } from "@/features/projects/hooks/useProjects"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { data: stats, isLoading: isStatsLoading } = useStats()
  const { data: projects = [], isLoading: isProjectsLoading } = useProjects()

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">Hi, Praveen! 👋</h1>
        <CreateProjectModal />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {isStatsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full rounded-xl" />
          ))
        ) : (
          <>
            <StatsCard
              title="Projects"
              value={stats?.projects || 0}
              icon={FolderKanban}
              description="Total projects"
            />
            <StatsCard
              title="Technologies"
              value={stats?.tech || 0}
              icon={BrainCircuit}
              description="Specific technologies"
            />
            <StatsCard
              title="Skills"
              value={stats?.skills || 0}
              icon={Code}
              description="Skill categories"
            />
            <StatsCard
              title="Certificates"
              value={stats?.certificates || 0}
              icon={Award}
              description="Achievements"
            />
          </>
        )}
      </div>

      <div className="mt-4">
        {isProjectsLoading ? (
          <Skeleton className="h-[400px] w-full rounded-xl" />
        ) : (
          <ProjectTable data={projects} />
        )}
      </div>
    </section>
  )
}
