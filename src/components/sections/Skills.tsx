'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Layout, Server, Database, LucideIcon } from 'lucide-react'
import { SKILLS_DATA, SkillGroup } from '@/data/skills'

// Register ScrollTrigger safely for Next.js SSR / client-side execution
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Icon Mapping dictionary to dynamically resolve icons from the reusable data structure
const IconMap: Record<'Brain' | 'Layout' | 'Server' | 'Database', LucideIcon> = {
  Brain,
  Layout,
  Server,
  Database,
}

interface SkillCardProps {
  group: SkillGroup
}

/**
 * Reusable SkillGroupCard Component representing a glassmorphic category card.
 * Uses tabIndex, focus-visible, and standard ARIA attributes for keyboard accessibility.
 */
function SkillGroupCard({ group }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const IconComponent = IconMap[group.icon]

  return (
    <div
      tabIndex={0}
      className="skill-group-card glass-card relative rounded-2xl p-8 transition-all duration-300 border border-white/5 outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      style={{
        boxShadow: isHovered || isFocused
          ? `0 12px 40px -10px ${group.glowColor}, 0 8px 32px 0 rgba(0, 0, 0, 0.4)`
          : '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        borderColor: isHovered || isFocused ? group.color : 'rgba(255, 255, 255, 0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={`${group.category} technologies group`}
    >
      {/* Category Rainbow Accent Top Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: group.color }}
      />

      <div className="flex flex-col gap-6">
        {/* Card Header: Icon, Category Name, Description */}
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-xl bg-white/5 border border-white/10 transition-transform duration-300"
            style={{ 
              color: group.color,
              transform: isHovered || isFocused ? 'scale(1.08)' : 'scale(1)'
            }}
          >
            <IconComponent className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-white">
              {group.category}
            </h3>
            <p className="text-xs text-muted-foreground leading-normal">
              {group.description}
            </p>
          </div>
        </div>

        {/* Card Body: Technologies & Skill Bars */}
        <div className="space-y-5">
          {group.technologies.map((tech) => (
            <div key={tech.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-white/90">
                  {tech.name}
                </span>
                <span 
                  className="font-mono text-xs font-bold"
                  style={{ color: group.color }}
                >
                  {tech.level}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div 
                className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5"
                role="progressbar"
                aria-valuenow={tech.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${tech.name} proficiency level: ${tech.level}%`}
              >
                {/* Glowing Progress bar fill: width animated dynamically by GSAP on scroll */}
                <div
                  className="skill-progress-bar h-full rounded-full transition-all duration-300"
                  data-level={tech.level}
                  style={{
                    backgroundColor: group.color,
                    boxShadow: `0 0 10px ${group.color}`,
                    width: '0%', // initial state for GSAP scroll reveal
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
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

      // 2. Cards reveal with a stagger animation on scroll
      if (cardsContainerRef.current) {
        gsap.fromTo(
          '.skill-group-card',
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

        // 3. Progress bars animate to their target level as cards enter view
        gsap.fromTo(
          '.skill-progress-bar',
          { width: '0%' },
          {
            width: (index, element) => {
              const targetLevel = element.getAttribute('data-level')
              return `${targetLevel}%`
            },
            duration: 1.4,
            delay: 0.3, // slight offset to allow cards to appear first
            stagger: 0.05,
            ease: 'power3.out',
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
      id="skills"
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-black overflow-hidden"
      aria-label="Capabilities Section"
    >
      {/* Background ambient lighting - Yellow & Green refraction */}
      <div className="absolute right-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-rainbow-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-rainbow-yellow/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-yellow uppercase mb-3">
            02. Capabilities
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical Expertise
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-yellow to-rainbow-green" />
        </div>

        {/* ─── Cards Grid ───
            Responsive Design Decisions:
            - Desktop: 2x2 grid (using grid-cols-2 on medium/large viewports, as we have 4 categories)
            - Tablet: 2 columns (md:grid-cols-2)
            - Mobile: 1 column (grid-cols-1)
            This configuration satisfies the responsive layouts for all viewport targets while maintaining clean gutters. */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {SKILLS_DATA.map((group) => (
            <SkillGroupCard key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
