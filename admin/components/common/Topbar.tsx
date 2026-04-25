import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageHeader } from "./PageHeader"

export function Topbar() {
  return (
    <div className="header-fixed w-full border-b bg-sidebar">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <PageHeader />
      </div>
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/144775786?v=4" />
        <AvatarFallback>PR</AvatarFallback>
      </Avatar>
    </div>
  )
}
