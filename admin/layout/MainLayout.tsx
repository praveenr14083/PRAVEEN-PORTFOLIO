import { AppSidebar } from "@/components/common/app-sidebar"
import { Topbar } from "@/components/common/Topbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Topbar />
        <section className="section-main">{children}</section>
      </main>
    </SidebarProvider>
  )
}
