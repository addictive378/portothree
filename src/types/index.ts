// TypeScript types for the Dark Side Portfolio project

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  color: string // A tailwind class for the shadow/border color (e.g., 'rainbow-red', 'rainbow-orange', etc.)
}

export interface Skill {
  name: string
  level: number // percentage
  color: string // hex or oklch name for R3F particles or CSS borders
  bgClass: string // Tailwind bg class for styling
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface TimelineItem {
  year: string
  role: string
  company: string
  description: string
}
