'use client'

/**
 * Hero.tsx — Full-screen hero section overlaying the global 3D scene.
 *
 * Layout change:
 *   Previously this component embedded a local R3F Canvas on the right side.
 *   Now the Three.js scene is global (GlobalScene.tsx, position:fixed behind
 *   all content). This section is a transparent overlay — the prism and
 *   rainbow beams are visible through the background.
 *
 *   The layout shifts to full-width centred text so the 3D scene acts as
 *   an immersive backdrop rather than a contained thumbnail.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP context for scoping and automatic cleanup in React
    const ctx = gsap.context(() => {
      // 1. Badge slides down and fades in
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        )
      }

      // 2. Main title fades in
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 }
        )
      }

      // 3. Subtitle slides upward into position
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
        )
      }

      // 4. CTA buttons appear with stagger animation
      if (buttonsContainerRef.current) {
        gsap.fromTo(
          '.animate-btn',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            delay: 0.9,
          }
        )
      }

      // 5. Ambient background glow loop
      gsap.fromTo(
        '.prism-bg-glow',
        { opacity: 0.15 },
        { opacity: 0.35, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      )
    }, containerRef)

    return () => ctx.revert() // Cleanup all GSAP animations on unmount
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
      aria-label="Hero Section"
    >
      {/* Background ambient gradient glows — pulse via GSAP */}
      <div className="prism-bg-glow absolute left-1/4 top-1/4 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rainbow-red/10 blur-[100px]" />
      <div className="prism-bg-glow absolute right-1/4 bottom-1/4 -z-10 h-[350px] w-[350px] translate-x-1/2 translate-y-1/2 rounded-full bg-rainbow-blue/10 blur-[100px]" />

      {/* ─── Centred content overlay — transparent so 3D scene shows through ─── */}
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-8 py-12 lg:py-20 z-10 text-center">
        {/* Small Badge */}
        <div ref={badgeRef} className="inline-flex items-center justify-center gap-2 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-rainbow-red animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue bg-clip-text text-transparent">
            Rust Developer
          </span>
        </div>

        {/* Main Heading */}
        <h1
          ref={titleRef}
          className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6"
        >
          ADI
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10"
        >
          Building intelligent systems and immersive web experiences.
        </p>

        {/* Two CTA Buttons with stagger animation */}
        <div
          ref={buttonsContainerRef}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            className="animate-btn bg-white text-black hover:bg-white/95 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-white/5 transition-all duration-300"
            onClick={() => {
              const el = document.getElementById('projects')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Projects
          </Button>
          <Button
            variant="outline"
            className="animate-btn border-white/10 hover:bg-white/5 text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300"
            onClick={() => {
              const el = document.getElementById('contact')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Contact Me
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <a
          href="#about"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Scroll to About section"
        >
          ↓
        </a>
      </div>
    </section>
  )
}
