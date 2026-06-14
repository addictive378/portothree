'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactForm from './contact/ContactForm'
import ContactInfo from './contact/ContactInfo'

// Register ScrollTrigger safely for Next.js SSR / client-side execution
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formWrapperRef = useRef<HTMLDivElement>(null)
  const infoWrapperRef = useRef<HTMLDivElement>(null)

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

      // 2. Left side: Form stagger reveal on scroll
      if (formWrapperRef.current) {
        // First animate the card itself, then stagger form fields inside
        gsap.fromTo(
          formWrapperRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formWrapperRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )

        gsap.fromTo(
          '.contact-form-field',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formWrapperRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 3. Right side: Info element reveals on scroll
      if (infoWrapperRef.current) {
        gsap.fromTo(
          '.contact-info-element',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoWrapperRef.current,
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
      id="contact"
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-transparent overflow-hidden"
      aria-label="Contact Section"
    >
      {/* Background ambient lighting - Violet & Blue refraction */}
      <div className="absolute left-1/3 bottom-0 -z-10 h-96 w-96 rounded-full bg-rainbow-violet/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-rainbow-blue/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ─── Section Header ─── */}
        <div ref={headerRef} className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-violet uppercase mb-3">
            04. Communication
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Initiate Alignment
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-blue to-rainbow-violet" />
        </div>

        {/* ─── Layout Grid ───
            Responsive Design Decisions:
            - Desktop: 12-column grid. Swapped order from older versions to fit:
              - Left side (col-span-7): Contact Form
              - Right side (col-span-5): Contact Information & Social links
            - Mobile: Stacks vertically (col-span-12 equivalent)
            This layout satisfies the responsive stacked requirements perfectly. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Form wrapper */}
          <div ref={formWrapperRef} className="lg:col-span-7 h-full">
            <ContactForm />
          </div>

          {/* Right Column: Contact info and social links wrapper */}
          <div ref={infoWrapperRef} className="lg:col-span-5 h-full">
            <ContactInfo
              email="hello@adi.dev"
              location="London, UK / Remote"
              githubUrl="https://github.com"
              linkedinUrl="https://linkedin.com"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
