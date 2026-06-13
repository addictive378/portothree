'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Scene from '@/components/three/Scene'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animation context for scoping and cleanup
    const ctx = gsap.context(() => {
      // Fade in and slide up the main heading
      gsap.fromTo(
        '.animate-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      )

      // Slide up the subtitle shortly after
      gsap.fromTo(
        '.animate-subtitle',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      )

      // Fade in the CTA buttons with a back ease
      gsap.fromTo(
        '.animate-cta',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)', delay: 0.8 }
      )

      // Slow glowing pulse for the prism backdrop
      gsap.fromTo(
        '.prism-bg-glow',
        { opacity: 0.1 },
        { opacity: 0.3, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      )
    }, containerRef)

    return () => ctx.revert() // Clean up GSAP timelines on unmount
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Background radial gradient representing light beam source */}
      <div className="prism-bg-glow absolute left-1/4 top-1/4 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rainbow-red/10 blur-[120px]" />
      <div className="prism-bg-glow absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-rainbow-blue/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Side: Copy and call-to-actions */}
          <div className="flex flex-col justify-center text-center lg:text-left lg:col-span-6 z-10">
            {/* Rainbow tagline */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4 text-xs font-bold tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-rainbow-red animate-pulse" />
              <span className="bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue bg-clip-text text-transparent">
                Creative WebGL Portfolio
              </span>
            </div>

            <h1 className="animate-title text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-tight">
              We Light The <br />
              <span className="relative">
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue" />
                Dark Side
              </span>{' '}
              Of Web.
            </h1>

            <p className="animate-subtitle mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              A premium developer portfolio bringing concepts to life using 3D layouts, reactive shading, and buttery-smooth GSAP choreography.
            </p>

            <div className="animate-cta mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button
                className="bg-white text-black hover:bg-white/95 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-white/5 transition-all duration-300"
                onClick={() => {
                  const projectsSec = document.getElementById('projects')
                  projectsSec?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View Showcase
              </Button>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300"
                onClick={() => {
                  const contactSec = document.getElementById('contact')
                  contactSec?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Let&apos;s Talk
              </Button>

            </div>
          </div>

          {/* Right Side: R3F Interactive Scene */}
          <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] w-full lg:col-span-6 rounded-2xl overflow-hidden border border-white/5 bg-black/40 backdrop-blur-3xl shadow-2xl">
            {/* Holographic border glow */}
            <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue opacity-10 pointer-events-none" />
            <Scene />
          </div>
        </div>
      </div>

      {/* Slide down arrow indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
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
