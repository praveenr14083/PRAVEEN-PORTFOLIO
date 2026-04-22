"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye, Trash2, Loader2 } from "lucide-react"
import { ReplaceResumeModal } from "../components/ReplaceResumeModal"
import { useResume, useDeleteResume } from "../hooks/useResume"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResumePage() {
  const { data: resume, isLoading } = useResume()
  const { mutate: deleteResume, isPending: isDeleting } = useDeleteResume()

  const handleDelete = () => {
    if (resume?._id && confirm("Are you sure you want to delete the resume?")) {
      deleteResume(resume._id)
    }
  }

  return (
    <section className="space-y-4">
      {/* 🔹 Top Action Row */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        {/* Preview */}
        <Button
          variant="secondary"
          className="gap-2"
          disabled={!resume}
          onClick={() => resume && window.open(resume.file.url, "_blank")}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>

        {/* Download */}
        <Button
          variant="outline"
          className="gap-2"
          disabled={!resume}
          onClick={() => resume && window.open(resume.file.url, "_blank")}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>

        {/* Delete */}
        <Button
          variant="destructive"
          className="gap-2"
          disabled={!resume || isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          Delete
        </Button>

        {/* Upload */}
        <ReplaceResumeModal />
      </div>

      {/* 🔹 Resume Preview Card */}
      {isLoading ? (
        <Skeleton className="h-[600px] w-full" />
      ) : resume ? (
        <Card className="overflow-hidden border-muted/20 p-0 shadow-lg">
          <CardContent className="p-5">
            <div className="relative aspect-[4/5] w-full">
              <iframe
                src={resume.file.url}
                className="h-full w-full rounded-md border bg-white shadow-md"
                title="Resume PDF Preview"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border border-dashed p-20 text-center">
          <p className="text-muted-foreground">No resume uploaded Yet.</p>
        </div>
      )}
    </section>
  )
}
