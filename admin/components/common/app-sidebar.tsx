"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useLogout } from "@/features/auth/hooks/useAuth"
import {
  Award,
  BrainCircuit,
  Briefcase,
  Code,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ConfirmDialog } from "./ConfirmDialog"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Projects", icon: FolderKanban, href: "/projects" },
  { name: "Technologies", icon: BrainCircuit, href: "/technologies" },
  { name: "Skills", icon: Code, href: "/skills" },
  { name: "Education", icon: GraduationCap, href: "/education" },
  { name: "Experience", icon: Briefcase, href: "/experience" },
  { name: "Certificates", icon: Award, href: "/certificates" },
  { name: "Resume", icon: FileText, href: "/resume" },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { state } = useSidebar()

  const isCollapsed = state === "collapsed"

  const { mutate: logout, isPending: isLoggingOut } = useLogout()
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)

  // Theme logic
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = theme === "dark"

  const handleLogout = () => {
    setLogoutConfirmOpen(true)
  }

  const handleConfirmLogout = () => {
    logout()
    setLogoutConfirmOpen(false)
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Header */}
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5" />
          {!isCollapsed && <span className="font-semibold">Admin Panel</span>}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)

              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="py-4"
                  >
                    <Link href={item.href}>
                      <Icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          {/* Theme Toggle */}
          {mounted && (
            <SidebarMenuItem>
              {isCollapsed ? (
                // 👉 Collapsed: show icon button
                <SidebarMenuButton
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                  {isDark ? <Moon /> : <Sun />}
                </SidebarMenuButton>
              ) : (
                // 👉 Expanded: show full switch
                <div className="flex w-full items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    {isDark ? <Moon size={16} /> : <Sun size={16} />}
                    <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
                  </div>

                  <Switch
                    checked={isDark}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                  />
                </div>
              )}
            </SidebarMenuItem>
          )}

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-500/80 active:bg-red-500/80"
            >
              <LogOut />
              <span>{!isCollapsed && "Logout"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={logoutConfirmOpen}
        onOpenChange={setLogoutConfirmOpen}
        title="Logout Confirmation"
        description="Are you sure you want to log out? You will need to sign in again to access the admin panel."
        confirmText="Logout"
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </Sidebar>
  )
}
