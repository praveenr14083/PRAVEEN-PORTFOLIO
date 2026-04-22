import { MainLayout } from "@/layout/MainLayout"
import { ProtectedRoute } from "@/components/common/ProtectedRoute"
import React from "react"

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  )
}
