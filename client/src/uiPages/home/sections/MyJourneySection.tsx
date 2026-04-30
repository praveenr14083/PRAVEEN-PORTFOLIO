'use client'
import { usePortfolio } from '@/hooks/usePortfolio'
import {
  BookOpen,
  BookSearch,
  Briefcase,
  Code,
  Code2,
  GraduationCap,
  Laptop,
  School,
  University,
} from 'lucide-react'
import { useMemo } from 'react'
import { EdExCard } from '../components/EdExCard'
import { EDUCATION, EXPERIENCE } from '../data/edex'

const ICON_MAP: Record<string, any> = {
  GraduationCap,
  School,
  University,
  BookOpen,
  Briefcase,
  Code,
  Code2,
}

export function MyJourneySection() {
  const { portfolioData, isLoading } = usePortfolio()
  const { education: fetchedEdu, experience: fetchedExp } = portfolioData

  const formatDate = (date: any) => {
    if (!date) return ''
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(
      new Date(date)
    )
  }

  const displayExperience = useMemo(() => {
    const dataToDisplay = fetchedExp && fetchedExp.length > 0 ? fetchedExp : EXPERIENCE
    return dataToDisplay.map((exp: any) => ({
      id: exp._id?.toString() || exp.id,
      title: exp.role,
      description: exp.company,
      year: `${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}`,
      isCurrent: exp.isCurrent,
      icon: ICON_MAP[exp.icon] || Code,
    }))
  }, [fetchedExp])

  const displayEducation = useMemo(() => {
    const dataToDisplay = fetchedEdu && fetchedEdu.length > 0 ? fetchedEdu : EDUCATION
    return dataToDisplay.map((edu: any) => ({
      id: edu._id?.toString() || edu.id,
      title: edu.degree,
      description: edu.institute,
      year: `${formatDate(edu.startDate)} - ${edu.isCurrent ? 'Present' : formatDate(edu.endDate)}`,
      isCurrent: edu.isCurrent,
      icon: ICON_MAP[edu.icon] || GraduationCap,
    }))
  }, [fetchedEdu])
  return (
    <section id="journey" className="section-fullscreen bg-background">
      <div className="w-full flex flex-col items-center justify-center gap-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl lg:text-4xl text-center font-doto font-bold uppercase">
            My Journey
          </h1>
          <p className="max-w-[600px] text-md text-muted-foreground text-center">
            A timeline of innovation, growth, and professional milestones defining my career path.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="order-2 md:order-1 flex flex-col gap-8">
            {/* Experience */}
            <div className="space-y-2">
              <div className="flex items-center gap-5">
                <div className="bg-primary-color p-2 rounded text-white">
                  <Laptop />
                </div>
                <h1 className="font-semibold text-2xl">Experience</h1>
              </div>
            </div>

            <div>
              {displayExperience.map((exp: any, index: number) => (
                <EdExCard key={exp.id || index} data={exp} />
              ))}
            </div>

            {/* Education */}
            <div className="space-y-2">
              <div className="flex items-center gap-5">
                <div className="bg-primary-color p-2 rounded text-white">
                  <BookSearch />
                </div>
                <h1 className="font-semibold text-2xl">Education</h1>
              </div>
            </div>
            <div>
              {displayEducation.map((edu: any, index: number) => (
                <EdExCard key={edu.id || index} data={edu} />
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 flex flex-col items-center lg:sticky lg:top-30 lg:self-start">
            <img
              className="w-80 h-auto"
              src="/images/myjourney-section/myjourney.png"
              alt="Praveen's Journey"
              width={320}
              height={320}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
