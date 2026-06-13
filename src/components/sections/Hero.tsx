'use client'

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
      // 1. Badge slide down and fade in
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        )
      }

      // 2. Main Title fades in
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 }
        )
      }

      // 3. Subtitle slides upward
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
        )
      }

      // 4. Buttons appear with stagger animation
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

      // 5. Ambient glowing background loop
      gsap.fromTo(
        '.prism-bg-glow',
        { opacity: 0.15 },
        { opacity: 0.35, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      )

      // 6. Subtle float animation for the 2D SVG Prism placeholder
      gsap.fromTo(
        '.svg-prism-placeholder',
        { y: -5 },
        { y: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      )
    }, containerRef)

    return () => ctx.revert() // Cleanup GSAP animations on unmount
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-20"
      aria-label="Hero Section"
    >
      {/* Background ambient gradient loops */}
      <div className="prism-bg-glow absolute left-1/4 top-1/4 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rainbow-red/10 blur-[100px]" />
      <div className="prism-bg-glow absolute right-1/4 bottom-1/4 -z-10 h-[350px] w-[350px] translate-x-1/2 translate-y-1/2 rounded-full bg-rainbow-blue/10 blur-[100px]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12 lg:py-20 z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Side: Branding, copy, and call-to-actions */}
          <div className="flex flex-col justify-center text-center lg:text-left lg:col-span-6">
            {/* Small Badge */}
            <div ref={badgeRef} className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4">
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
              className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10"
            >
              Building intelligent systems and immersive web experiences.
            </p>

            {/* Two Buttons with Stagger Animations */}
            <div
              ref={buttonsContainerRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Button
                className="animate-btn bg-white text-black hover:bg-white/95 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-white/5 transition-all duration-300"
                onClick={() => {
                  const projectsSec = document.getElementById('projects')
                  projectsSec?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                className="animate-btn border-white/10 hover:bg-white/5 text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300"
                onClick={() => {
                  const contactSec = document.getElementById('contact')
                  contactSec?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Side: Reserved container for future Three.js Scene */}
          <div className="lg:col-span-6 flex items-center justify-center w-full">
            <div className="relative h-[320px] sm:h-[420px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-white/5 bg-white/2 backdrop-blur-3xl shadow-2xl flex items-center justify-center">
              
              {/* Subtle glassmorphic grid background lines in placeholder */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
              
              {/* Emotive SVG placeholder mimicking the Pink Floyd prism concept */}
              <div className="svg-prism-placeholder relative w-64 h-64 flex items-center justify-center z-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Incoming light beam from bottom left */}
                  <line x1="0" y1="65" x2="42" y2="52" stroke="white" strokeWidth="1" strokeOpacity="0.8" />
                  
                  {/* Outgoing fanned-out rainbow beams */}
                  <path d="M58 52 L100 25" stroke="#ff0055" strokeWidth="1.8" strokeOpacity="0.75" />
                  <path d="M58 52.8 L100 33" stroke="#ff7f00" strokeWidth="1.8" strokeOpacity="0.75" />
                  <path d="M58 53.6 L100 41" stroke="#ffdd00" strokeWidth="1.8" strokeOpacity="0.75" />
                  <path d="M58 54.4 L100 49" stroke="#00ff66" strokeWidth="1.8" strokeOpacity="0.75" />
                  <path d="M58 55.2 L100 57" stroke="#0088ff" strokeWidth="1.8" strokeOpacity="0.75" />
                  <path d="M58 56 L100 65" stroke="#7a00ff" strokeWidth="1.8" strokeOpacity="0.75" />

                  {/* Glass Triangle Prism (Outer wireframe and semi-translucent fill) */}
                  <polygon 
                    points="50,25 32,65 68,65" 
                    fill="rgba(255,255,255,0.02)" 
                    stroke="rgba(255,255,255,0.25)" 
                    strokeWidth="1.5" 
                  />
                  
                  {/* Subtle inner reflection */}
                  <polygon 
                    points="50,29 35,63 65,63" 
                    stroke="rgba(255,255,255,0.08)" 
                    strokeWidth="1" 
                  />
                </svg>
              </div>

              {/* Holographic background glow */}
              <div className="absolute inset-0 rounded-2xl border border-white/5 opacity-20 pointer-events-none" />
              
              {/* Future Integration Badge Overlay */}
              <div className="absolute bottom-4 right-4 bg-black/60 border border-white/5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-muted-foreground uppercase z-10 backdrop-blur-md">
                3D Canvas Reserved
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide down arrow indicator */}
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
