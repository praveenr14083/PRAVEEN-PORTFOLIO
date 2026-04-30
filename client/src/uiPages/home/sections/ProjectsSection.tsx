'use client'
import { ButtonRounded } from '@/components/common/ButtonRounded'
import { usePortfolio } from '@/hooks/usePortfolio'
import { cn } from '@/lib/utils'
import { UIProject } from '@/types/portfolio'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECTS_DATA } from '../data/projects'

type Category = {
  id: string
  name: string
  type: string
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isExpanded, setIsExpanded] = useState(false)

  // 🔥 Reset expansion state when category changes
  useEffect(() => {
    setIsExpanded(false)
  }, [activeCategory])
  const { portfolioData, isLoading, error } = usePortfolio()
  const { projects: fetchedProjects } = portfolioData

  const displayProjects = useMemo(() => {
    const dataToDisplay =
      fetchedProjects && fetchedProjects.length > 0 ? fetchedProjects : PROJECTS_DATA
    return dataToDisplay.map((p: any) => ({
      id: p._id || p.id,
      title: p.title,
      description: p.description,
      tech: p.technologies || [],
      demo: p.liveUrl,
      github: p.githubUrl,
      image: p.image?.url || 'https://placehold.co/600x400/png',
      category: p.category,
    }))
  }, [fetchedProjects])

  // 🔥 Extract unique categories dynamically from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(displayProjects.map((p: any) => p.category)))
      .filter(Boolean)
      .map((cat: any) => ({
        id: cat.toLowerCase().replace(/\s+/g, '-'),
        name: cat,
        type: cat.toLowerCase(),
      }))

    return [{ id: 'all', name: 'All', type: 'all' }, ...uniqueCategories]
  }, [displayProjects])

  // 🔥 Filter projects by active category
  const filteredProjects = useMemo(() => {
    return activeCategory === 'all'
      ? displayProjects
      : displayProjects.filter((p: any) => p.category.toLowerCase() === activeCategory)
  }, [displayProjects, activeCategory])

  const visibleProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, 6)

  return (
    <section id="projects" className="section-fullscreen bg-background py-20">
      <div className="w-full flex flex-col items-center gap-12">
        {/* Header */}
        <div data-aos="fade-up" className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl lg:text-4xl font-doto font-bold uppercase">Featured Projects</h1>
          <p className="max-w-150 text-md text-muted-foreground text-center">
            Showcasing innovation and technical expertise across Frontend, Fullstack, and AI
            domains.
          </p>
        </div>

        {/* Tabs */}
        <div data-aos="fade-up" className="flex flex-wrap justify-center gap-1 p-1 bg-foreground/5 rounded-full backdrop-blur-sm border border-border/50">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.type)}
              className={cn(
                'px-4 py-1 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === cat.type
                  ? 'bg-primary-color text-white shadow-lg scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && <p className="text-muted-foreground">Loading...</p>}

        {/* Empty */}
        {!isLoading && filteredProjects.length === 0 && (
          <p className="text-muted-foreground">No projects found</p>
        )}

        {/* Projects Grid */}
        <div data-aos="fade-up" className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-12 gap-10">
          {visibleProjects.map((project: UIProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Show More Button */}
        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-4">
            <ButtonRounded
              onClick={() => setIsExpanded(!isExpanded)}
              icon={isExpanded ? ChevronUp : ChevronDown}
              className="font-semibold"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </ButtonRounded>
          </div>
        )}
      </div>
    </section>
  )
}
