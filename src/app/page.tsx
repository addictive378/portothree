import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import MusicPlayer from '@/components/music/MusicPlayer'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
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

      {/* Cinematic Floating Music Player widget */}
      <MusicPlayer />
    </div>
  )
}
