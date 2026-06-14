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

// ─── Scene State System ───
// Defines the sections of the portfolio that the 3D scene can react to.
// This union type is the foundation for future scroll storytelling —
// any component (DOM or R3F) can use it to coordinate behaviour
// based on which section the user is currently viewing.

export type SceneSection =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'contact'

// Camera keyframe describing the cinematic viewpoint for a section.
// Used by CameraController to interpolate between positions.
export interface CameraKeyframe {
  /** Which portfolio section this keyframe corresponds to */
  section: SceneSection
  /** Scroll progress at which this keyframe is fully active (0–1) */
  progress: number
  /** Camera world position [x, y, z] */
  position: [number, number, number]
  /** Camera lookAt target [x, y, z] */
  target: [number, number, number]
  /** Scene fog density — 0 = clear, higher = atmospheric fade */
  fogDensity: number
}

