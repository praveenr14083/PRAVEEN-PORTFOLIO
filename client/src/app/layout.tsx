import { Toaster } from '@/components/ui/sonner'
import { MainLayout } from '@/layout/MainLayout'
import { QueryProvider } from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Doto, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const doto = Doto({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-doto',
  display: 'swap',
})

export const metadata = {
  title: 'Praveen Portfolio',
  description:
    "A portfolio website showcasing Praveen's projects, skills, and experience in web development and design.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <MainLayout>
              {children}
              <Toaster richColors position="bottom-center" />
            </MainLayout>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
