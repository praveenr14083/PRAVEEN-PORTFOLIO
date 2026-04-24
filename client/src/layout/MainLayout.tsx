"use client";
import React from 'react'
import { Footer } from '../components/common/Footer'
import { Navbar } from '../components/common/Navbar'
import { usePortfolio } from '@/hooks/usePortfolio';
import { LoadingScreen } from '../components/common/LoadingScreen';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = usePortfolio();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Navbar />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  )
}
