"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react"
import React, { useState } from "react"
import { useUpdateResume } from "../hooks/useResume"

export function ReplaceResumeModal() {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { mutate: updateResume, isPending } = useUpdateResume()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("file", selectedFile)

    updateResume(formData, {
      onSuccess: () => {
        setOpen(false)
        setSelectedFile(null)
        setPreviewUrl(null)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 gap-2 bg-primary font-medium hover:bg-primary/90">
          <Upload className="h-4 w-4" />
          Update Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Update Resume</DialogTitle>
          <DialogDescription>
            Upload a new resume file. This will replace the current one.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Resume Document</Label>

            <div
              className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed bg-muted transition-all duration-300`}
              onClick={() =>
                document.getElementById("modal-resume-upload")?.click()
              }
            >
              <input
                id="modal-resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex w-full animate-in flex-col items-center justify-center px-4 py-10 text-center duration-300 zoom-in-95">
                  <div className="relative mb-4">
                    <div className="rounded-full bg-primary p-4">
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute top-1 -right-1 rounded-full bg-background p-0.5">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <p className="max-w-[200px] truncate font-bold">
                    {selectedFile.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    className="mt-4 h-8 gap-1 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-transparent px-6 py-12 text-center transition-all">
                  <div className="mb-4 rounded-full bg-primary p-4">
                    <Upload className="h-8 w-8" />
                  </div>
                  <h4 className="font-semibold">Click to upload</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    PDF, DOC or DOCX up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedFile || isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload & Publish
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
