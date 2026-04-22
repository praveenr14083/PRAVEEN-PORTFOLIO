import { MainLayout } from "@/layout/MainLayout"
import React from "react"

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
