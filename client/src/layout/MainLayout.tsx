'use client'
import { usePortfolio } from '@/hooks/usePortfolio'
import React from 'react'
import { Footer } from '../components/common/Footer'
import { LoadingScreen } from '../components/common/LoadingScreen'
import { Navbar } from '../components/common/Navbar'
import AOS from 'aos'
import 'aos/dist/aos.css'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = usePortfolio()
  const [minTimeElapsed, setMinTimeElapsed] = React.useState(false)
  const showLoading = isLoading || !minTimeElapsed

  React.useEffect(() => {
    if (!showLoading) {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
        mirror: false,
      })
      AOS.refresh()
    }
  }, [showLoading])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])


  React.useEffect(() => {
    if (showLoading) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [showLoading])

  return (
    <>
      {showLoading && <LoadingScreen />}
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  )
}
