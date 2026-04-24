"use client";
import React, { useMemo, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { cn } from "@/lib/utils";
import { Project } from "../data/projects";
import { useProjects } from "@/hooks/useProjects";

type Category = {
  id: string;
  name: string;
  type: string;
};

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: projects = [], isLoading, error } = useProjects();

  // 🔥 Extract unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((p: Project) => p.category)),
    ).map((cat: string) => ({
      id: cat.toLowerCase(),
      name: cat,
      type: cat.toLowerCase(),
    }));

    return [{ id: "all", name: "All", type: "all" }, ...uniqueCategories];
  }, [projects]);

  // 🔥 Filter projects by active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter(
          (p: Project) => p.category.toLowerCase() === activeCategory,
        );

  return (
    <section id="projects" className="section-fullscreen bg-background py-20">
      <div className="w-full flex flex-col items-center gap-12">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl lg:text-4xl font-doto font-bold uppercase">
            Featured Projects
          </h1>
          <p className="max-w-150 text-md text-muted-foreground text-center">
            Showcasing innovation and technical expertise across Frontend,
            Fullstack, and AI domains.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 p-1 bg-foreground/5 rounded-full backdrop-blur-sm border border-border/50">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.type)}
              className={cn(
                "px-4 py-1 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === cat.type
                  ? "bg-primary-color text-white shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
