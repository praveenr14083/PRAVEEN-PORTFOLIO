import { Geist_Mono, Inter } from "next/font/google"

import QueryProvider from "@/components/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Praveen | Admin Panel",
  description:
    "Secure admin dashboard to manage portfolio projects, skills, certificates, and content for Praveen's personal portfolio website.",
  keywords: [
    "admin panel",
    "portfolio admin",
    "dashboard",
    "Praveen portfolio",
    "content management",
  ],
  authors: [{ name: "Praveen" }],
  robots: "noindex, nofollow",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Praveen | Admin Panel",
    description: "Secure admin dashboard for Praveen's portfolio.",
    type: "website",
    siteName: "Praveen Portfolio Admin",
  },
  twitter: {
    card: "summary",
    title: "Praveen | Admin Panel",
    description: "Secure admin dashboard for Praveen's portfolio.",
  },
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="bottom-right" richColors />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
