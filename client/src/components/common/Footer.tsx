"use client";
import { SocialMedia } from "@/components/common/SocialMedia";
import { SKILLS_DATA } from "@/uiPages/home/data/skills";
import React from "react";
import Marquee from "react-fast-marquee";
import { usePortfolio } from "@/hooks/usePortfolio";

export function Footer() {
  const { portfolioData } = usePortfolio();
  const { technologies } = portfolioData;

  const displaySkills = technologies && technologies.length > 0 
    ? technologies 
    : SKILLS_DATA.flatMap((item) => item.skills);

  return (
    <section
      id="footer"
      className="w-full bg-background py-8 sm:py-10 md:py-12 lg:py-14 space-y-8"
    >
      <div className="section-px ">
        <div className="flex flex-col items-center gap-6">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-c-primary text-center">
              PRAVEEN R
            </h1>
            <p className="text-center text-muted-foreground">
              Designing with Purpose. Developing with Precision.
            </p>
          </div>

          {/* Social */}
          <SocialMedia />
        </div>
      </div>

      {/* ✅ Marquee Using Local Skills Array */}
      <div className="relative border-dashed border-t border-b border-gray-400/20 py-4 italic overflow-hidden">
        <Marquee className="w-full h-[6rem]">
          {displaySkills.map((skill, index) => {
            const name = typeof skill === 'string' ? skill : (skill as any).name;
            return (
              <h1
                key={index}
                className="font-semibold text-4xl md:text-7xl flex items-center pl-10 md:pl-20"
              >
                {name}
              </h1>
            );
          })}
        </Marquee>
      </div>

      {/* Copyright */}
      <div className="text-center text-muted-foreground">
        © {new Date().getFullYear()} Copyright. All Rights Reserved.
      </div>
    </section>
  );
}
