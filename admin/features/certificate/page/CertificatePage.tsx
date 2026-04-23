"use client"

import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateCertificateModal } from "../components/CreateCertificateModal"
import { EditCertificateModal } from "../components/EditCertificateModal"
import { CertificateCard } from "../components/CertificateCard"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { useCertificates, useDeleteCertificate } from "../hooks/useCertificates"
import { Skeleton } from "@/components/ui/skeleton"
import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { NotFound } from "@/components/common/NotFound"

export default function CertificatePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editOpen, setEditOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any | null>(
    null
  )
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const { data: certificates = [], isLoading } = useCertificates()
  const { mutate: deleteCertificate } = useDeleteCertificate()

  // Sample certificates data
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

  const handleDelete = (certId: string) => {
    setDeleteId(certId)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteCertificate(deleteId)
      setDeleteConfirmOpen(false)
      setDeleteId(null)
    }
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
      {isLoading ? (
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredCertificates.length > 0 ? (
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
        <div className="mt-4">
          <NotFound
            title="No certificates found"
            description={
              searchTerm
                ? "Try adjusting your search terms"
                : "Add your first certificate"
            }
          />
        </div>
      )}

      {/* Edit Modal */}
      <EditCertificateModal
        open={editOpen}
        onOpenChange={setEditOpen}
        certificate={selectedCertificate}
      />

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Certificate"
        description="Are you sure you want to delete this certificate? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}
