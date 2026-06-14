/**
 * page.tsx — Root page composition with two-layer architecture.
 *
 * Layering Strategy:
 *   ┌─────────────────────────────────────────────────┐
 *   │  z-0   GlobalScene (position:fixed, fullscreen) │  ← 3D background
 *   │  z-10  Content layer (scrollable DOM sections)  │  ← HTML content
 *   │  z-50  MusicPlayer (position:fixed, floating)   │  ← Floating widget
 *   └─────────────────────────────────────────────────┘
 *
 *   The GlobalScene Canvas is rendered FIRST and sits at z-0 behind
 *   all content. The scrollable content layer uses relative positioning
 *   and z-10 to float above the 3D scene. Each section has a transparent
 *   or semi-transparent background — the prism, beams, and stars bleed
 *   through, creating depth and immersion.
 *
 *   The MusicPlayer floats at z-50, above everything.
 */

import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import MusicPlayer from '@/components/music/MusicPlayer'
import GlobalScene from '@/components/three/GlobalScene'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* ─── Layer 0: Global 3D Scene (fixed fullscreen background) ───
          GlobalScene is a 'use client' component that guards against SSR
          internally via a mounted state check. No next/dynamic needed. */}
      <GlobalScene />

      {/* ─── Layer 1: Scrollable DOM Content ───
          Uses relative positioning and z-10 to sit above the fixed Canvas.
          Sections use transparent/semi-transparent backgrounds so the
          3D scene bleeds through, creating visual depth. */}
      <div className="relative z-10">
        {/* Floating Header Navbar */}
        <Navbar />

        {/* Main Sections */}
        <main className="flex flex-col">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* ─── Layer 2: Floating Music Player (z-50, above everything) ─── */}
      <MusicPlayer />
    </div>
  )
}
