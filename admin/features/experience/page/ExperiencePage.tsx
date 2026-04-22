"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateExperienceModal } from "../components/CreateExperienceModal"
import { EditExperienceModal } from "../components/EditExperienceModal"
import { ExperienceCard } from "../components/ExperienceCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

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
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceFormData | null>(null)

  // Sample experience data
  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "Tech Company Inc.",
      location: "New York, USA",
      employmentType: "Full-Time",
      description:
        "Led development of microservices architecture and mentored junior developers",
      startDate: "2022-01-15",
      endDate: "",
      isCurrent: true,
    },
    {
      role: "Frontend Developer",
      company: "Digital Solutions Ltd.",
      location: "Remote",
      employmentType: "Full-Time",
      description:
        "Developed responsive web applications using React and Next.js",
      startDate: "2020-06-01",
      endDate: "2021-12-31",
      isCurrent: false,
    },
    {
      role: "Intern - Web Developer",
      company: "Startup Hub",
      location: "California, USA",
      employmentType: "Internship",
      description:
        "Built and maintained web applications during summer internship",
      startDate: "2019-06-01",
      endDate: "2019-08-31",
      isCurrent: false,
    },
  ]

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

  const handleDelete = (role: string) => {
    console.log("Delete experience:", role)
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
      {filteredExperience.length > 0 ? (
        <div className="mt-4 space-y-4">
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
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No experience found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Add your work experience"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <EditExperienceModal
        open={editOpen}
        onOpenChange={setEditOpen}
        experience={selectedExperience}
      />
    </section>
  )
}
