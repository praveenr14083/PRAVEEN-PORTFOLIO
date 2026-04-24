"use client";
import React, { useState } from "react";
import { navitems } from "@/utils/navitems.const";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Download } from "lucide-react";
import { ButtonRounded } from "@/components/common/ButtonRounded";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useResume } from "@/hooks/useResume";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: resume } = useResume();

  const handleResumeClick = () => {
    if (resume?.fileUrl) {
      window.open(resume.fileUrl, "_blank");
    }
  };

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
          <ScrollLink
            to="hero-section"
            smooth={true}
            duration={500}
            offset={-70}
            className={`text-xl font-doto cursor-pointer`}
          >
            PRAVEEN
          </ScrollLink>
        </div>

        <div className="flex items-center gap-8">
          <ul className="hidden lg:flex gap-6">
            {navitems.map((item) => (
              <li key={item.name}>
                <ScrollLink
                  to={item.href.replace("#", "")}
                  smooth={true}
                  duration={500}
                  offset={-70} // Adjust based on your navbar height
                  className="hover:text-primary-color cursor-pointer"
                >
                  {item.name}
                </ScrollLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <ButtonRounded
              className="hidden md:flex"
              icon={Download}
              onClick={handleResumeClick}
            >
              Resume
            </ButtonRounded>

            <Avatar className="size-10">
              <AvatarImage src="https://avatars.githubusercontent.com/u/144775786?v=4" />
              <AvatarFallback>PR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      {isOpen && <DropdownMenu onClose={() => setIsOpen(false)} resumeUrl={resume?.fileUrl} />}
    </>
  );
}

export function DropdownMenu({ onClose, resumeUrl }: { onClose: () => void; resumeUrl?: string }) {
  const handleResumeClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
    onClose();
  };

  return (
    <div className="lg:hidden w-full h-full section-px section-py bg-background fixed z-50" style={{ top: "var(--navbar-height)" }}>
      <ul className="flex flex-col gap-6">
        {navitems.map((item) => (
          <li key={item.name} className="hover:text-primary-color">
            <ScrollLink
              to={item.href.replace("#", "")}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={onClose}
              className="hover:text-primary-color flex items-center gap-3 cursor-pointer"
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
  );
}
