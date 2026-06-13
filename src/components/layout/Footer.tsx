'use client'

import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 bg-black py-12 text-muted-foreground">
      {/* Decorative Rainbow Line Divider at the top of the footer */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-rainbow-red via-rainbow-orange via-rainbow-yellow via-rainbow-green via-rainbow-blue to-rainbow-violet opacity-30" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-mono text-sm font-semibold tracking-wider text-white">
              DARK SIDE PORTFOLIO
            </span>
            <p className="text-center md:text-left text-xs text-muted-foreground">
              Inspired by the classic prism. Engineered for the modern web.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row text-xs">
          <p>&copy; {currentYear} Dark Side Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with
            <span className="h-2 w-2 rounded-full bg-rainbow-red animate-pulse" />
            Next.js 15, R3F & GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
