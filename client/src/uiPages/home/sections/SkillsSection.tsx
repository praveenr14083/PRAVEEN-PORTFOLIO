"use client";
import React from "react";
import { SkillCard } from "../components/SkillCard";
import { SKILLS_DATA } from "../data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="section-fullscreen bg-background">
      <div className="w-full flex flex-col items-center justify-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl lg:text-4xl text-center font-doto font-bold uppercase">
            My Skills
          </h1>
          <p className="max-w-[600px] text-md text-muted-foreground text-center h-[50px] flex items-center justify-center">
            A curated tech stack for performance, scalability, and AI
            integration.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT - Sticky Image (Desktop Only) */}
          <div className="flex flex-col items-center lg:sticky lg:top-30 lg:self-start">
            <img
              className="w-96"
              src="/images/skills.png"
              alt="Praveen"
            />
          </div>

          {/* RIGHT - Scrollable Skills (Desktop Only) */}
          <div className="flex flex-col items-center justify-start gap-8">
            {SKILLS_DATA.map((skillCategory, index) => (
              <SkillCard
                key={index}
                title={skillCategory.title}
                description={skillCategory.description}
                Icon={skillCategory.Icon}
                skills={skillCategory.skills}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
