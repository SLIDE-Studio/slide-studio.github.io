"use client"

import { useState, useEffect, useCallback } from "react"
import { X } from "lucide-react"
import { projects } from "@/data/projects"

export function ProjectGrid() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = projects.find((p) => p.id === activeId)

  const close = useCallback(() => setActiveId(null), [])

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [activeId, close])

  return (
    <section id="research" className="py-8">
      {/* Masonry-style grid */}
      <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
        {projects.map((project, idx) => (
          <button
            type="button"
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className="group mb-6 block w-full text-left break-inside-avoid"
          >
            {/* Project Image Placeholder */}
            <div 
              className="relative w-full overflow-hidden bg-muted"
              style={{ 
                aspectRatio: idx % 3 === 0 ? '4/3' : idx % 3 === 1 ? '1/1' : '3/4',
              }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary">
                  <span className="text-6xl font-bold text-muted-foreground/20">
                    {project.id}
                  </span>
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="mt-4">
              <h3 className="text-sm font-bold uppercase tracking-wide leading-tight">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.category} —— {project.year}
              </p>
              {project.tags.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.tags.slice(0, 2).join(", ")}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
        >
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />

          <div
            className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden bg-background shadow-2xl md:max-h-[85vh] md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center bg-background text-foreground transition-colors hover:bg-muted"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left: Media */}
            <div className="flex w-full shrink-0 items-center justify-center bg-secondary md:w-1/2">
              {activeProject.video ? (
                <iframe
                  src={activeProject.video}
                  title={activeProject.title}
                  className="aspect-video w-full md:h-full md:min-h-[400px] md:aspect-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeProject.image ? (
                <img
                  src={activeProject.image}
                  alt={`Preview of ${activeProject.title}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center md:h-full md:min-h-[400px] md:aspect-auto">
                  <span className="text-8xl font-bold text-muted-foreground/20">
                    {activeProject.id}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Text */}
            <div className="flex flex-1 flex-col overflow-y-auto p-8">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {activeProject.category} — {activeProject.year}
              </p>

              <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight">
                {activeProject.title}
              </h3>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {activeProject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border px-2 py-1 text-xs uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold uppercase tracking-wide underline"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
