import { SkillCrossMarquee } from '../components/SkillCrossMarquee'
import { AboutSection } from '../sections/AboutSection'
import { CertificateSection } from '../sections/CertificateSection'
import { ContactSection } from '../sections/ContactSection'
import { HeroSection } from '../sections/HeroSection'
import { MyJourneySection } from '../sections/MyJourneySection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { SkillsSection } from '../sections/SkillsSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillCrossMarquee />
      <SkillsSection />
      <ProjectsSection />
      <MyJourneySection />
      <CertificateSection />
      <ContactSection />
    </>
  )
}
