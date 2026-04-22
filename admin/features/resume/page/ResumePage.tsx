"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye, Trash2 } from "lucide-react"
import { ReplaceResumeModal } from "../components/ReplaceResumeModal"

export default function ResumePage() {
  const mockResume = {
    file: {
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      public_id: "resumes/praveen_resume_v2",
    },
    updatedAt: "2024-04-20T10:00:00Z",
  }

  return (
    <section className="space-y-4">
      {/* 🔹 Top Action Row */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        {/* Preview */}
        <Button variant="secondary" className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>

        {/* Download */}
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.open(mockResume.file.url, "_blank")}
        >
          <Download className="h-4 w-4" />
          Download
        </Button>

        {/* Delete */}
        <Button variant="destructive" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>

        {/* Upload */}
        <ReplaceResumeModal />
      </div>

      {/* 🔹 Resume Preview Card */}
      <Card className="overflow-hidden border-muted/20 p-0 shadow-lg">
        <CardContent className="p-5">
          <div className="relative aspect-[4/5] w-full">
            <iframe
              src={mockResume.file.url}
              className="h-full w-full rounded-md border bg-white shadow-md"
              title="Resume PDF Preview"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
