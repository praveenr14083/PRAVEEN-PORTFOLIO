import React from "react";
import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
import { SkillsSection } from "../sections/SkillsSection";
import { ProjectsSection } from "../sections/ProjectsSection";
import { MyJourneySection } from "../sections/MyJourneySection";
import { ContactSection } from "../sections/ContactSection";
import { SkillCrossMarquee } from "../components/SkillCrossMarquee";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillCrossMarquee />
      <SkillsSection />
      <ProjectsSection />
      <MyJourneySection />
      <ContactSection />
    </>
  );
}
