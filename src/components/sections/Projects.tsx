'use client'

import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { PROJECTS_DATA } from '@/data/portfolio'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Project } from '@/types'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Map spectrum color name to theme classes
  const colorMap: Record<string, { border: string; glow: string; text: string; bg: string }> = {
    'rainbow-red': {
      border: 'hover:border-rainbow-red',
      glow: 'shadow-[0_0_20px_rgba(255,0,85,0.15)]',
      text: 'text-rainbow-red',
      bg: 'bg-rainbow-red/10 border-rainbow-red/20 text-rainbow-red',
    },
    'rainbow-orange': {
      border: 'hover:border-rainbow-orange',
      glow: 'shadow-[0_0_20px_rgba(255,127,0,0.15)]',
      text: 'text-rainbow-orange',
      bg: 'bg-rainbow-orange/10 border-rainbow-orange/20 text-rainbow-orange',
    },
    'rainbow-green': {
      border: 'hover:border-rainbow-green',
      glow: 'shadow-[0_0_20px_rgba(0,255,102,0.15)]',
      text: 'text-rainbow-green',
      bg: 'bg-rainbow-green/10 border-rainbow-green/20 text-rainbow-green',
    },
  }

  return (
    <section id="projects" className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-rainbow-blue/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-green uppercase mb-3">
            03. Portfolio
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Selected Creations
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-green to-rainbow-blue" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => {
            const colors = colorMap[project.color] || colorMap['rainbow-red']
            return (
              <Card
                key={project.id}
                className={`glass-card flex flex-col h-full border border-white/5 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${colors.border} ${colors.glow}`}
              >
                <CardContent className="p-6 flex-grow">
                  {/* Miniature tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>

                <CardFooter className="p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
                  <Button
                    variant="link"
                    className={`p-0 h-auto font-bold text-xs uppercase tracking-widest ${colors.text} hover:opacity-80 transition-opacity`}
                    onClick={() => setSelectedProject(project)}
                  >
                    View Case Study &rarr;
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Case Study Detail Dialog */}
        <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="glass-card max-w-2xl bg-black/90 border border-white/10 text-white rounded-2xl backdrop-blur-2xl">
            {selectedProject && (
              <>
                <DialogHeader className="text-left">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded border border-white/10 bg-white/5 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground pt-1">
                    Detailed case study of the project and technical decisions.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                  {/* Mock project visualization */}
                  <div className="relative aspect-video w-full rounded-lg border border-white/5 bg-gradient-to-br from-black via-white/5 to-black flex items-center justify-center overflow-hidden">
                    {/* Simulated laser refraction line */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)]" />
                    <div className="h-[2px] w-2/3 bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue opacity-50 shadow-[0_0_10px_rgba(255,0,0,0.5)] animate-pulse" />
                    <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/40">
                      Visual Model Simulation
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Project Overview</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-white/5 pt-4">
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 text-white gap-2"
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                      Repository
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button
                      className="bg-white text-black hover:bg-white/90 gap-2"
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
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
