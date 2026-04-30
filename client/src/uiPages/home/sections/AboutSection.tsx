'use client'
import { ButtonRounded } from '@/components/common/ButtonRounded'
import { BriefcaseBusiness } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-fullscreen bg-background overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div data-aos="fade-up" className="flex items-center justify-center p-10">
          <img
            className="w-80 h-auto"
            src="/images/about-section/about.png"
            alt="About Praveen"
            width={320}
            height={320}
          />
        </div>
        <div data-aos="fade-up" className="flex flex-col items-center lg:items-start justify-center gap-8">
          <h1 className="text-2xl lg:text-4xl text-center lg:text-start font-doto font-bold uppercase">
            About Me
          </h1>
          <p className="text-md text-muted-foreground text-center lg:text-justify ">
            I am Praveen R, a B.Sc. Computer Science graduate with a solid programming foundation. I
            specialize as a Full-Stack Developer using React, Next.js, and FastAPI. I work with both
            SQL and NoSQL databases like Firebase. I combine technical expertise with design skills
            to build complete, responsive web applications. I'm passionate about learning new
            technologies and creating impactful digital experiences.
          </p>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
            <ButtonRounded icon={BriefcaseBusiness}>Hire Me</ButtonRounded>
          </ScrollLink>
        </div>
      </div>
    </section>
  )
}
