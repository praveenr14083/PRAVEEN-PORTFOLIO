"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, FileText, CheckCircle2, Loader2 } from "lucide-react"
import { useUpdateResume } from "../hooks/useResume"
import { toast } from "sonner"

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
        <Button className="h-10 gap-2 font-medium bg-primary hover:bg-primary/90">
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
              className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 ${
                selectedFile 
                  ? "border-primary bg-primary/5 shadow-inner" 
                  : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
              }`}
              onClick={() => document.getElementById("modal-resume-upload")?.click()}
            >
              <input
                id="modal-resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex flex-col items-center justify-center px-4 py-10 w-full text-center animate-in zoom-in-95 duration-300">
                  <div className="relative mb-4">
                    <div className="rounded-2xl bg-primary/10 p-4">
                      <FileText className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 rounded-full bg-background p-0.5">
                      <CheckCircle2 className="h-5 w-5 text-green-500 fill-background" />
                    </div>
                  </div>
                  <p className="max-w-[200px] truncate font-bold text-primary">
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
                    className="mt-4 text-destructive hover:bg-destructive/10 hover:text-destructive gap-1 h-8 rounded-full"
                  >
                    <X className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center transition-all bg-transparent">
                  <div className="mb-4 rounded-full bg-primary/5 p-4 group-hover:bg-primary/10 transition-colors">
                    <Upload className="h-8 w-8 text-primary/40 group-hover:text-primary transition-colors" />
                  </div>
                  <h4 className="font-semibold text-foreground/80">Click to upload</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    PDF, DOC or DOCX up to 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              type="submit" 
              disabled={!selectedFile || isPending}
              className="w-full h-11 font-bold shadow-lg shadow-primary/20"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload & Publish
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="w-full text-muted-foreground hover:bg-transparent hover:text-foreground"
            >
              Discard changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
