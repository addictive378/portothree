'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, ExternalLink, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { PROJECTS_DATA, Project } from '@/data/projects'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

// Register ScrollTrigger safely for Next.js SSR / client-side execution
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectCardProps {
  project: Project
  onOpenDetails: (project: Project) => void
}

/**
 * Reusable ProjectCard Component representing a glassmorphic showcase card.
 * Uses keyboard-accessible buttons and semantic structure.
 */
function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <article
      tabIndex={0}
      className="project-card-container group glass-card relative flex flex-col h-full rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      style={{
        boxShadow: isHovered || isFocused
          ? `0 12px 40px -10px ${project.glowColor}, 0 8px 32px 0 rgba(0, 0, 0, 0.4)`
          : '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        borderColor: isHovered || isFocused ? project.color : 'rgba(255, 255, 255, 0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={`Project: ${project.title}`}
    >
      {/* Rainbow Accent Top Border Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ backgroundColor: project.color }}
      />

      {/* Project Thumbnail Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border-b border-white/5">
        {/* Ambient background glow inside thumbnail */}
        <div 
          className="absolute inset-0 opacity-10 blur-xl pointer-events-none transition-opacity duration-500 group-hover:opacity-20"
          style={{ backgroundColor: project.color }}
        />
        <Image
          src={project.image}
          alt={`${project.title} user interface visualization`}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
          sizes="(max-w-768px) 100vw, 50vw"
        />
      </div>

      {/* Card Details */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        <div className="space-y-2">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-muted-foreground">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-white">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Card Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 mt-auto border-t border-white/5">
          <Button
            variant="link"
            className="p-0 h-auto font-bold text-xs uppercase tracking-widest gap-1 group/btn"
            style={{ color: project.color }}
            onClick={() => onOpenDetails(project)}
            aria-label={`View detailed case study of ${project.title}`}
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/10 transition-colors"
                aria-label={`View ${project.title} code repository on GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/10 transition-colors"
                aria-label={`View live demonstration of ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP Context to handle scoping and memory-safe cleanup
    const ctx = gsap.context(() => {
      // 1. Header fade-in and slide-up on scroll
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 2. Project cards reveal with a stagger animation on scroll
      if (cardsContainerRef.current) {
        gsap.fromTo(
          '.project-card-container',
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert() // Cleanup GSAP animations on component unmount
  }, [])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-transparent overflow-hidden"
      aria-label="Projects Portfolio Section"
    >
      {/* Background ambient lighting - Blue & Violet refraction */}
      <div className="absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-rainbow-blue/5 blur-[150px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-rainbow-violet/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-green uppercase mb-3">
            03. Portfolio
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Selected Creations
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-green to-rainbow-blue" />
        </div>

        {/* ─── Cards Grid ───
            Responsive Design Decisions:
            - Desktop & Tablet: 2 columns (md:grid-cols-2)
            - Mobile: 1 column (grid-cols-1)
            This configuration implements the requested responsive structure perfectly. */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {PROJECTS_DATA.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={setSelectedProject}
            />
          ))}
        </div>

        {/* ─── Case Study Details Dialog ───
            Implementation Details:
            Uses the accessible shadcn/ui Dialog component based on @base-ui/react/dialog.
            Provides keyboard accessibility, focus trapping, and modal close triggers. */}
        <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="glass-card max-w-2xl bg-black/95 border border-white/10 text-white rounded-2xl backdrop-blur-2xl p-6 sm:max-w-2xl overflow-y-auto max-h-[90vh]">
            {selectedProject && (
              <>
                <DialogHeader className="text-left space-y-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                    <span 
                      className="w-2 h-6 rounded-full inline-block"
                      style={{ backgroundColor: selectedProject.color }}
                    />
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground pt-1">
                    Detailed case study of architectural challenges and implementations.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  {/* Mock project screenshot/visualization */}
                  <div className="relative aspect-video w-full rounded-lg border border-white/5 overflow-hidden bg-neutral-950">
                    <div 
                      className="absolute inset-0 opacity-15 blur-2xl pointer-events-none"
                      style={{ backgroundColor: selectedProject.color }}
                    />
                    <Image
                      src={selectedProject.image}
                      alt={`${selectedProject.title} detail display`}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>

                  {/* Overview */}
                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-white uppercase tracking-wider text-xs">
                      Project Overview
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Challenges & Solutions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Challenge Block */}
                    <div className="p-5 rounded-xl border border-white/5 bg-white/3 space-y-3">
                      <div className="flex items-center gap-2 text-rainbow-red">
                        <ShieldAlert className="w-5 h-5" />
                        <h5 className="font-bold text-sm text-white uppercase tracking-wider text-xs">
                          Technical Challenge
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>

                    {/* Solution Block */}
                    <div className="p-5 rounded-xl border border-white/5 bg-white/3 space-y-3">
                      <div className="flex items-center gap-2 text-rainbow-green">
                        <CheckCircle2 className="w-5 h-5" />
                        <h5 className="font-bold text-sm text-white uppercase tracking-wider text-xs">
                          Solution & Result
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {selectedProject.solutions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dialog Links Footer */}
                <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-white/5 pt-4">
                  {selectedProject.github && (
                    <Button
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 text-white gap-2 font-semibold text-xs uppercase tracking-wider rounded-xl py-5 px-6"
                      onClick={() => window.open(selectedProject.github, '_blank')}
                      aria-label="Open project GitHub repository"
                    >
                      <Github className="h-4 w-4" />
                      Repository
                    </Button>
                  )}
                  {selectedProject.demo && (
                    <Button
                      className="text-black hover:bg-white/90 gap-2 font-semibold text-xs uppercase tracking-wider rounded-xl py-5 px-6"
                      style={{ backgroundColor: selectedProject.color }}
                      onClick={() => window.open(selectedProject.demo, '_blank')}
                      aria-label="Open project live demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
