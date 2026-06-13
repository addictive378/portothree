'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/data/portfolio'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add a scroll listener to adjust navbar background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="group relative flex items-center gap-2 font-mono text-xl font-bold tracking-widest text-white"
          >
            <span className="transition-colors group-hover:text-rainbow-red">D</span>
            <span className="transition-colors group-hover:text-rainbow-orange">A</span>
            <span className="transition-colors group-hover:text-rainbow-yellow">R</span>
            <span className="transition-colors group-hover:text-rainbow-green">K</span>
            <span className="ml-1 text-muted-foreground">SIDE</span>
            
            {/* Prism mini logo icon */}
            <span className="ml-2 h-3 w-3 rotate-45 border border-white transition-transform group-hover:scale-110" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200 group py-1"
              >
                {link.label}
                {/* Rainbow sliding underline on hover */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Button
              variant="outline"
              className="border-rainbow-red hover:bg-rainbow-red/10 text-white rounded-full px-5 text-sm font-medium transition-all duration-300"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/5 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-black/95 backdrop-blur-xl border-l border-white/5 p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 mt-16">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-muted-foreground hover:text-white transition-colors py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="outline"
            className="border-rainbow-red hover:bg-rainbow-red/10 text-white w-full rounded-full mt-4"
            onClick={() => {
              setIsOpen(false)
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </nav>
  )
}
