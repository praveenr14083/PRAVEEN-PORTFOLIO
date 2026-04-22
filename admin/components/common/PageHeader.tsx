"use client"

import { usePathname } from "next/navigation"

export function PageHeader() {
  const pathname = usePathname()

  const format = (str: string) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  const segments = pathname.split("/").filter(Boolean)

  const title = segments.length
    ? format(segments[segments.length - 1])
    : "Dashboard"

  return <h1 className="font-semibold">{title}</h1>
}
