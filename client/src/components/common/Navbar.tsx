'use client'
import { ButtonRounded } from '@/components/common/ButtonRounded'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePortfolio } from '@/hooks/usePortfolio'
import { navitems } from '@/utils/navitems.const'
import { Download, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { portfolioData } = usePortfolio()
  const resumeUrl = portfolioData?.resume?.file?.url

  const handleResumeClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank')
    }
  }

  return (
    <>
      <nav className="bg-background/30 backdrop-blur-2xl border-b navbar sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden bg-[none] hover:bg-[none] text-foreground"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <ScrollLink to="hero-section" smooth={true} duration={500} offset={-70} spy={true}>
            PRAVEEN
          </ScrollLink>
        </div>

        <div className="flex items-center gap-8">
          <ul className="hidden lg:flex gap-6">
            {navitems.map((item) => (
              <li key={item.name}>
                <ScrollLink
                  to={item.href.replace('#', '')}
                  smooth={true}
                  duration={500}
                  offset={-70} // Adjust based on your navbar height
                  spy={true}
                  activeClass="text-primary-color"
                  className="hover:text-primary-color cursor-pointer transition-colors"
                >
                  {item.name}
                </ScrollLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <ButtonRounded className="hidden md:flex" icon={Download} onClick={handleResumeClick}>
              Resume
            </ButtonRounded>

            <Link
              href="https://admin-praveenrdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar className="size-10">
                <AvatarImage src="/images/profile/profile-photo.png" />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </nav>

      {isOpen && <DropdownMenu onClose={() => setIsOpen(false)} resumeUrl={resumeUrl} />}
    </>
  )
}

export function DropdownMenu({ onClose, resumeUrl }: { onClose: () => void; resumeUrl?: string }) {
  const handleResumeClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank')
    }
    onClose()
  }

  return (
    <div
      className="lg:hidden w-full h-full section-px section-py bg-background fixed z-50"
      style={{ top: 'var(--navbar-height)' }}
    >
      <ul className="flex flex-col gap-6">
        {navitems.map((item) => (
          <li key={item.name} className="hover:text-primary-color">
            <ScrollLink
              to={item.href.replace('#', '')}
              smooth={true}
              duration={500}
              offset={-70}
              spy={true}
              activeClass="text-primary-color"
              onClick={onClose}
              className="hover:text-primary-color flex items-center gap-3 cursor-pointer transition-colors"
            >
              <item.icon size={20} />
              {item.name}
            </ScrollLink>
          </li>
        ))}
        <li>
          <button
            onClick={handleResumeClick}
            disabled={!resumeUrl}
            className="hover:text-primary-color flex items-center gap-3 cursor-pointer disabled:opacity-50"
          >
            <Download size={20} />
            Resume
          </button>
        </li>
      </ul>
    </div>
  )
}
