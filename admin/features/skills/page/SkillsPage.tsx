"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateSkillModal } from "../components/CreateSkillModal"
import { EditSkillModal } from "../components/EditSkillModal"
import { SkillCard } from "../components/SkillCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

type SkillFormData = {
  name: string
  description: string
  icon: string
  technologies: string
}

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillFormData | null>(null)

  // Sample skills data
  const skills = [
    {
      name: "React",
      description:
        "A JavaScript library for building user interfaces with reusable components",
      technologies: ["JavaScript", "JSX", "Hooks"],
      icon: "code",
    },
    {
      name: "TypeScript",
      description:
        "Typed superset of JavaScript for building robust applications",
      technologies: ["JavaScript", "Type System"],
      icon: "code",
    },
    {
      name: "Node.js",
      description: "JavaScript runtime for building server-side applications",
      technologies: ["JavaScript", "Express", "REST API"],
      icon: "server",
    },
    {
      name: "MongoDB",
      description: "NoSQL database for flexible data storage",
      technologies: ["NoSQL", "Database", "JSON"],
      icon: "database",
    },
    {
      name: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces",
      technologies: ["Figma", "Tailwind CSS", "Design Systems"],
      icon: "palette",
    },
    {
      name: "Next.js",
      description: "React framework for production applications",
      technologies: ["React", "SSR", "API Routes"],
      icon: "zap",
    },
  ]

  const handleReset = () => {
    setSearchTerm("")
  }

  // Filter skills based on search
  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.technologies?.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  const handleEdit = (skill: any) => {
    setSelectedSkill({
      name: skill.name,
      description: skill.description,
      icon: skill.icon,
      technologies: skill.technologies.join(","),
    })
    setEditOpen(true)
  }

  const handleDelete = (skillName: string) => {
    console.log("Delete skill:", skillName)
    // TODO: Implement delete functionality
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search skills by name or technology..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw />
        </Button>
        <CreateSkillModal />
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No skills found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Create your first skill to get started"}
          </p>
        </div>
      )}

      {/* Edit Skill Modal */}
      <EditSkillModal
        open={editOpen}
        onOpenChange={setEditOpen}
        skill={selectedSkill}
      />
    </section>
  )
}
