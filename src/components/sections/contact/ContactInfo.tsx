'use client'

import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react'

export interface ContactInfoProps {
  email: string
  location: string
  githubUrl: string
  linkedinUrl: string
}

/**
 * Reusable ContactInfo component showing location, email, and social links.
 * Highly accessible with semantic markup and proper ARIA labels.
 */
export default function ContactInfo({ email, location, githubUrl, linkedinUrl }: ContactInfoProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const infoItems = [
    {
      id: 'location',
      label: 'Location',
      value: location,
      icon: <MapPin className="w-5 h-5" />,
      color: 'var(--rainbow-blue)',
      glowColor: 'rgba(0, 136, 255, 0.12)',
    },
    {
      id: 'email',
      label: 'Email Address',
      value: email,
      href: `mailto:${email}`,
      icon: <Mail className="w-5 h-5" />,
      color: 'var(--rainbow-violet)',
      glowColor: 'rgba(122, 0, 255, 0.12)',
    },
  ]

  const socialLinks = [
    {
      id: 'github',
      label: 'GitHub',
      username: 'github.com/adi',
      href: githubUrl,
      icon: <Github className="w-5 h-5" />,
      color: 'var(--rainbow-red)',
      glowColor: 'rgba(255, 0, 85, 0.12)',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      username: 'linkedin.com/in/adi',
      href: linkedinUrl,
      icon: <Linkedin className="w-5 h-5" />,
      color: 'var(--rainbow-green)',
      glowColor: 'rgba(0, 255, 102, 0.12)',
    },
  ]

  return (
    <div className="flex flex-col h-full justify-between gap-8 text-left">
      {/* Introduction text */}
      <div className="space-y-4 contact-info-element">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Let&apos;s build the spectrum together.
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Have an interesting project, role, or concept that could benefit from low-level systems speed or high-end web aesthetics? Let&apos;s talk about art, technology, and engineering.
        </p>
      </div>

      {/* Info Items List */}
      <div className="space-y-4">
        {infoItems.map((item) => {
          const isHovered = hoveredCard === item.id
          return (
            <div
              key={item.id}
              className="contact-info-element glass-card relative flex items-center gap-4 p-4 rounded-xl border border-white/5 transition-all duration-300"
              style={{
                boxShadow: isHovered
                  ? `0 12px 30px -10px ${item.glowColor}, 0 4px 12px 0 rgba(0, 0, 0, 0.4)`
                  : 'none',
                borderColor: isHovered ? item.color : 'rgba(255, 255, 255, 0.05)',
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-colors"
                style={{ color: item.color }}
              >
                {item.icon}
              </div>
              <div className="flex-grow">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-white hover:underline focus:outline-none focus:underline decoration-white/30"
                    aria-label={`Send an email to ${item.value}`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Social links grid */}
      <div className="space-y-4">
        <h4 className="contact-info-element text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-white/5 pb-2">
          Social Signals
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((social) => {
            const isHovered = hoveredCard === social.id
            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-element glass-card relative flex items-center gap-3 p-4 rounded-xl border border-white/5 transition-all duration-300 outline-none focus-visible:ring-1 focus-visible:ring-white/20 group"
                style={{
                  boxShadow: isHovered
                    ? `0 12px 30px -10px ${social.glowColor}, 0 4px 12px 0 rgba(0, 0, 0, 0.4)`
                    : 'none',
                  borderColor: isHovered ? social.color : 'rgba(255, 255, 255, 0.05)',
                }}
                onMouseEnter={() => setHoveredCard(social.id)}
                onMouseLeave={() => setHoveredCard(null)}
                aria-label={`Visit my ${social.label} profile at ${social.username}`}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-white/5 transition-colors group-hover:scale-105"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </div>
                <div className="flex-grow text-left">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    {social.label}
                  </span>
                  <span className="text-xs font-semibold text-white flex items-center gap-1 group-hover:underline">
                    {social.username.replace('github.com/', '').replace('linkedin.com/in/', '')}
                    <ExternalLink className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Floyd album quote card */}
      <div className="contact-info-element border border-white/5 bg-white/3 rounded-xl p-5 glass-card text-left mt-auto">
        <p className="text-xs italic text-muted-foreground">
          &ldquo;There is no dark side of the moon really. Matter of fact it&apos;s all dark.&rdquo;
        </p>
        <span className="block mt-2 text-[9px] font-mono tracking-widest text-white/40 uppercase">
          — Eclipse (1973)
        </span>
      </div>
    </div>
  )
}
