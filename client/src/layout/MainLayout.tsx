'use client'
import { usePortfolio } from '@/hooks/usePortfolio'
import React from 'react'
import { Footer } from '../components/common/Footer'
import { LoadingScreen } from '../components/common/LoadingScreen'
import { Navbar } from '../components/common/Navbar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = usePortfolio()
  const [minTimeElapsed, setMinTimeElapsed] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const showLoading = isLoading || !minTimeElapsed

  return (
    <>
      {showLoading && <LoadingScreen />}
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  )
}
