'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal, Cpu, Award } from 'lucide-react'

// Register ScrollTrigger safely for Next.js SSR / client-side execution
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Reusable Prism SVG Icon representing the Pink Floyd Dark Side of the Moon prism
 * This is used at the top-left of the profile image where the white light enters and splits.
 */
function PrismIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-12 h-12 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
      aria-hidden="true"
    >
      <polygon
        points="50,15 90,85 10,85"
        fill="rgba(255,255,255,0.03)"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <polygon points="50,15 70,85 30,85" fill="rgba(255,255,255,0.06)" />
    </svg>
  )
}

interface StatCardProps {
  value: string
  label: string
  description: string
  icon: React.ReactNode
  color: string // CSS color variable name or value, e.g. 'var(--rainbow-red)'
  glowColor: string // Shadow glow color, e.g. 'rgba(255, 0, 85, 0.12)'
}

/**
 * Reusable StatCard component with glassmorphic design, hover glow, and a top rainbow accent line
 */
function StatCard({ value, label, description, icon, color, glowColor }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="stat-card glass-card relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group overflow-hidden border border-white/5"
      style={{
        boxShadow: isHovered
          ? `0 12px 40px -10px ${glowColor}, 0 8px 32px 0 rgba(0, 0, 0, 0.4)`
          : '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        borderColor: isHovered ? color : 'rgba(255, 255, 255, 0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rainbow top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        {/* Card Header: Value & Icon */}
        <div className="flex justify-between items-start">
          <span
            className="text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-300"
            style={{ color: isHovered ? '#fff' : color }}
          >
            {value}
          </span>
          <div
            className="p-2 rounded-lg bg-white/5 border border-white/10 transition-colors duration-300"
            style={{ color }}
          >
            {icon}
          </div>
        </div>

        {/* Card Body */}
        <div className="space-y-1.5">
          <h4 className="text-sm font-bold tracking-wider uppercase text-white">
            {label}
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP context for scoping and clean automatic unmount/revert
    const ctx = gsap.context(() => {
      // 1. Fade-in and slide-up for section header on scroll
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

      // 2. Profile image container fades in and slides in from the left on scroll
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 3. Right-side text content elements fade in and slide up sequentially (staggered children)
      if (textContentRef.current) {
        gsap.fromTo(
          textContentRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textContentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 4. Statistics cards reveal with a stagger animation on scroll
      if (cardsContainerRef.current) {
        gsap.fromTo(
          '.stat-card',
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert() // Clean up all GSAP bindings
  }, [])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-transparent overflow-hidden"
      aria-label="About Me Section"
    >
      {/* Background ambient gradient glow - Violet/Blue */}
      <div className="absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-rainbow-violet/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-rainbow-blue/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-red uppercase mb-3">
            01. Background
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            About Me
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-red to-rainbow-orange" />
        </div>

        {/* ─── Layout Grid ───
            Layout Decision:
            We use a 12-column grid for desktop to create an asymmetric layout (Left column: 5/12, Right column: 7/12).
            This mimics modern editorial design and creates a clean visual hierarchy.
            On mobile, we stack the columns vertically (`grid-cols-1`) for a seamless reading experience. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center lg:items-start">
          
          {/* Left Column: Profile image placeholder & prism-inspired border */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-[380px] aspect-square rounded-2xl group"
            >
              {/* Outer decorative borders and gradients implementing the Pink Floyd theme */}
              
              {/* 1. White laser beam light entering the prism from the left side */}
              <div 
                className="absolute top-[18px] right-[100%] w-[120px] h-[1px] bg-gradient-to-r from-transparent via-white to-white opacity-40 rotate-[15deg] origin-right hidden lg:block pointer-events-none" 
                aria-hidden="true"
              />

              {/* 2. Conic-gradient representing the rainbow light refracted behind the image container */}
              <div
                className="absolute -top-3 -left-3 w-[150%] h-[150%] -z-20 pointer-events-none opacity-20 blur-[40px] hidden lg:block"
                style={{
                  background:
                    'conic-gradient(from 135deg at 20px 20px, transparent 0deg, var(--rainbow-red) 15deg, var(--rainbow-orange) 30deg, var(--rainbow-yellow) 45deg, var(--rainbow-green) 60deg, var(--rainbow-blue) 75deg, var(--rainbow-violet) 90deg, transparent 105deg)',
                }}
                aria-hidden="true"
              />

              {/* 3. Decorative glassmorphic prism icon at the collision point of the light ray */}
              <div 
                className="absolute -top-3 -left-3 z-30 p-1 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hidden lg:block"
                aria-hidden="true"
              >
                <PrismIcon />
              </div>

              {/* 4. Glowing rainbow outline border wrapper */}
              <div 
                className="absolute inset-0 -z-10 rounded-2xl p-[1px] bg-gradient-to-tr from-rainbow-violet via-rainbow-blue via-rainbow-green via-rainbow-yellow via-rainbow-orange to-rainbow-red opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
                aria-hidden="true"
              />

              {/* 5. Rainbow blur glow effect on hover */}
              <div 
                className="absolute inset-0 -z-20 rounded-2xl bg-gradient-to-tr from-rainbow-violet via-rainbow-blue via-rainbow-green via-rainbow-yellow via-rainbow-orange to-rainbow-red opacity-10 blur-xl group-hover:opacity-25 transition-opacity duration-500" 
                aria-hidden="true"
              />

              {/* Profile Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                <Image
                  src="/avatar_prism.jpg"
                  alt="Developer Silhouette with Prism Refraction"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: Title, Intro text, Personal story & stats */}
          <div ref={textContentRef} className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Subheading */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Building intelligent systems and deep, fast digital experiences.
            </h3>

            {/* Body Text / Narrative */}
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                I am a software engineer dedicated to building clean, robust, and highly optimized digital solutions. 
                With a focus on performance-critical systems, I bridge the gap between low-level system design and frontend user experience, 
                transforming complex concepts into fluid, interactive realities.
              </p>
              <p>
                My technical foundation is built on <strong className="text-white">Rust</strong> and system-level performance. 
                I design memory-safe, asynchronous services and WebAssembly modules that bring native speed to the browser. 
                Alongside my low-level expertise, I treat <strong className="text-white">Linux</strong> as my primary development environment—mastering system configurations, automation scripts, and containerized workflows to build bulletproof deployment pipelines.
              </p>
              <p>
                Believing that software engineering is continuously evolving, I embrace <strong className="text-white">AI-assisted development</strong> as a core force multiplier. 
                By pairing modern language models and agentic workflows with rigorous software testing, static analysis, and code reviews, 
                I accelerate prototyping and refactoring cycles without sacrificing architectural integrity or clean coding principles.
              </p>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-white/10 my-4" />

            {/* Statistics Cards Grid */}
            <div 
              ref={cardsContainerRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2"
            >
              <StatCard
                value="5+"
                label="Years Learning"
                description="Deepening Rust, system architecture, and modern web paradigms since 2021."
                icon={<Award className="w-5 h-5" />}
                color="var(--rainbow-red)"
                glowColor="rgba(255, 0, 85, 0.12)"
              />
              <StatCard
                value="40+"
                label="Projects Built"
                description="Successfully deployed production-grade apps, libraries, and interactive 3D sites."
                icon={<Cpu className="w-5 h-5" />}
                color="var(--rainbow-green)"
                glowColor="rgba(0, 255, 102, 0.12)"
              />
              <StatCard
                value="20+"
                label="Techs Used"
                description="Fluent in Rust, TypeScript, Linux environments, Next.js, and WebGL rendering."
                icon={<Terminal className="w-5 h-5" />}
                color="var(--rainbow-blue)"
                glowColor="rgba(0, 136, 255, 0.12)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
