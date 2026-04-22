"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateCertificateModal } from "../components/CreateCertificateModal"
import { EditCertificateModal } from "../components/EditCertificateModal"
import { CertificateCard } from "../components/CertificateCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

type CertificateFormData = {
  name: string
  image: {
    url: string
    public_id: string
  }
}

export default function CertificatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateFormData | null>(null)

  // Sample certificates data
  const certificates = [
    {
      name: "AWS Certified Solutions Architect",
      image: {
        url: "https://via.placeholder.com/300x200",
        public_id: "",
      },
    },
    {
      name: "Google Cloud Associate Cloud Engineer",
      image: {
        url: "https://via.placeholder.com/300x200",
        public_id: "",
      },
    },
    {
      name: "Microsoft Azure Developer Associate",
      image: {
        url: "https://via.placeholder.com/300x200",
        public_id: "",
      },
    },
  ]

  const handleReset = () => {
    setSearchTerm("")
  }

  const filteredCertificates = certificates.filter((cert) =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (certificate: any) => {
    setSelectedCertificate(certificate)
    setEditOpen(true)
  }

  const handleDelete = (certName: string) => {
    console.log("Delete certificate:", certName)
  }

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw />
        </Button>
        <CreateCertificateModal />
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length > 0 ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((certificate, index) => (
            <CertificateCard
              key={index}
              certificate={certificate}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h3 className="text-lg font-semibold">No certificates found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Add your first certificate"}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <EditCertificateModal
        open={editOpen}
        onOpenChange={setEditOpen}
        certificate={selectedCertificate}
      />
    </section>
  )
}
