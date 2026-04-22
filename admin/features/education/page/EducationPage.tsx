"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateEducationModal } from "../components/CreateEducationModal"
import { EditEducationModal } from "../components/EditEducationModal"
import { EducationCard } from "../components/EducationCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

type EducationFormData = {
  degree: string
  institute: string
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  grade: string
  gradeType: string
}

export default function EducationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedEducation, setSelectedEducation] =
    useState<EducationFormData | null>(null)

  // Sample education data
  const educationList = [
    {
      degree: "Bachelor of Science in Computer Science",
      institute: "State University",
      location: "New York, USA",
      startDate: "2019-09-01",
      endDate: "2023-05-31",
      isCurrent: false,
      grade: "3.8",
      gradeType: "CGPA",
    },
    {
      degree: "Master of Science in Data Science",
      institute: "Tech Institute",
      location: "California, USA",
      startDate: "2023-09-01",
      endDate: "",
      isCurrent: true,
      grade: "3.9",
      gradeType: "CGPA",
    },
  ]

  const handleReset = () => {
    setSearchTerm("")
  }

  const filteredEducation = educationList.filter(
    (edu) =>
      edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.institute.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (education: any) => {
    setSelectedEducation(education)
    setEditOpen(true)
  }

  const handleDelete = (degree: string) => {
    console.log("Delete education:", degree)
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search education..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw />
        </Button>
        <CreateEducationModal />
      </div>

      {/* Education List */}
      {filteredEducation.length > 0 ? (
        <div className="mt-4 space-y-4">
          {filteredEducation.map((education, index) => (
            <EducationCard
              key={index}
              education={education}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No education found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Add your education details"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <EditEducationModal
        open={editOpen}
        onOpenChange={setEditOpen}
        education={selectedEducation}
      />
    </section>
  )
}
