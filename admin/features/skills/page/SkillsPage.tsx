"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateSkillModal } from "../components/CreateSkillModal"
import { EditSkillModal } from "../components/EditSkillModal"
import { SkillCard } from "../components/SkillCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useSkills, useDeleteSkill } from "../hooks/useSkills"
import { Skeleton } from "@/components/ui/skeleton"

type SkillFormData = {
  name: string
  description: string
  icon: string
  technologies: string
}

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<any | null>(null)

  const { data: skills = [], isLoading } = useSkills()
  const { mutate: deleteSkill } = useDeleteSkill()

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
    setSelectedSkill(skill)
    setEditOpen(true)
  }

  const handleDelete = (skillId: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      deleteSkill(skillId)
    }
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
        <CreateSkillModal />
      </div>

      {/* Skills Grid */}
      {isLoading ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredSkills.length > 0 ? (
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
