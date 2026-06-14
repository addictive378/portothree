'use client'

/**
 * CameraController.tsx — Cinematic scroll-driven camera journey.
 *
 * Architecture:
 *   This component lives INSIDE the R3F Canvas. It reads the page scroll
 *   position via GSAP ScrollTrigger (DOM-side) and translates it into
 *   smooth camera movements using Three.js Vector3 lerping inside the
 *   R3F useFrame loop. This separation avoids React re-renders entirely —
 *   scroll progress is stored in a plain ref, and the camera is mutated
 *   directly each frame.
 *
 * Scene State Integration:
 *   The component tracks which SceneSection is currently active based on
 *   scroll progress. The active section is stored in a ref for zero-cost
 *   reads by sibling R3F components (e.g. for future atmosphere changes).
 *   The `activeSectionRef` is exposed for parent components to read.
 *
 * Camera Journey Design:
 *   The scroll range (0–1) is divided into keyframes that correspond to
 *   the page sections. Between keyframes the camera position and lookAt
 *   target are interpolated with a slow lerp factor for buttery-smooth,
 *   cinematic movement with no sudden jumps.
 *
 * Performance:
 *   - Zero React state. All values are refs mutated in useFrame.
 *   - ScrollTrigger only writes a single float to a ref each tick.
 *   - Lerp factor (0.03) means the camera "catches up" smoothly, never
 *     snapping, even if the user scrolls fast.
 *
 * Accessibility:
 *   - Respects prefers-reduced-motion: if enabled, the camera stays at
 *     the Hero position with no scroll-driven movement.
 */

import { useEffect, useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { CameraKeyframe, SceneSection } from '@/types'
import { scrollState } from './scrollStore'

// Register ScrollTrigger for DOM-side scroll tracking
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Camera keyframes mapping each portfolio section to a cinematic viewpoint.
 *
 * The prism sits at world origin [0, 0, 0]. All positions are relative to it.
 * The journey tells a visual story:
 *
 *   Hero (0.0)      → Wide establishing shot, camera far from prism
 *   About (0.25)    → Moves closer, intimate reveal of the prism
 *   Skills (0.5)    → Slight orbit to the right, showing spectrum angle
 *   Projects (0.75) → Wide cinematic pull-back, dramatic angle
 *   Contact (1.0)   → Pulls far back and up, atmospheric fade-out
 */
const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    section: 'hero',
    progress: 0.0,
    position: [0, 0.3, 8],       // Far wide shot — prism small and centred
    target: [0, 0, 0],
    fogDensity: 0.0,
  },
  {
    section: 'about',
    progress: 0.25,
    position: [-0.8, 0.1, 5.5],  // Drift left and closer — intimate
    target: [0, -0.1, 0],
    fogDensity: 0.01,
  },
  {
    section: 'skills',
    progress: 0.5,
    position: [1.2, 0.4, 5.8],   // Orbit right — reveal the spectrum beams
    target: [0.3, 0, 0],
    fogDensity: 0.015,
  },
  {
    section: 'projects',
    progress: 0.75,
    position: [-0.5, 0.8, 7.5],  // Pull back wide and up — dramatic cinematic
    target: [0, -0.2, 0],
    fogDensity: 0.02,
  },
  {
    section: 'contact',
    progress: 1.0,
    position: [0, 1.5, 10],      // Far pull-back — atmospheric fade into darkness
    target: [0, 0, 0],
    fogDensity: 0.04,
  },
]

/**
 * Finds the two keyframes that bracket the current scroll progress
 * and returns the interpolation factor between them.
 */
function getInterpolatedKeyframe(
  progress: number,
  keyframes: CameraKeyframe[]
): { from: CameraKeyframe; to: CameraKeyframe; t: number } {
  // Clamp progress to [0, 1]
  const p = Math.max(0, Math.min(1, progress))

  // Find bracketing keyframes
  let fromIdx = 0
  for (let i = keyframes.length - 1; i >= 0; i--) {
    if (p >= keyframes[i].progress) {
      fromIdx = i
      break
    }
  }

  const toIdx = Math.min(fromIdx + 1, keyframes.length - 1)
  const from = keyframes[fromIdx]
  const to = keyframes[toIdx]

  // Calculate local interpolation factor between these two keyframes
  const range = to.progress - from.progress
  const t = range > 0 ? (p - from.progress) / range : 0

  return { from, to, t }
}

/**
 * Derives the currently active section from scroll progress.
 * The active section is the one whose keyframe progress is closest
 * without exceeding the current scroll position.
 */
function getActiveSection(progress: number, keyframes: CameraKeyframe[]): SceneSection {
  const p = Math.max(0, Math.min(1, progress))
  let active: SceneSection = keyframes[0].section
  for (const kf of keyframes) {
    if (p >= kf.progress) {
      active = kf.section
    }
  }
  return active
}

export default function CameraController() {
  const { camera, scene } = useThree()

  // ─── Refs for zero-rerender performance ───
  // Scroll progress is written by ScrollTrigger (DOM) and read by useFrame (R3F)
  const scrollProgressRef = useRef(0)
  const prefersReducedMotionRef = useRef(false)

  // Active section ref — readable by sibling R3F components for future
  // scroll storytelling features (e.g. atmospheric colour shifts, particle
  // effects, prism behaviour changes per section).
  const activeSectionRef = useRef<SceneSection>('hero')

  // Reusable vectors to avoid GC pressure inside the animation loop
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const targetLookAt = useMemo(() => new THREE.Vector3(), [])
  const currentLookAt = useMemo(() => new THREE.Vector3(), [])

  // ─── ScrollTrigger Setup ───
  // Creates a single ScrollTrigger that maps the entire page scroll (0–100%)
  // to a normalised progress float. This runs on the DOM side and simply
  // writes to a ref — no React state, no re-renders.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check prefers-reduced-motion on mount
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotionRef.current = mql.matches

      // Listen for changes (user can toggle while page is open)
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches
      }
      mql.addEventListener('change', handler)

      // ScrollTrigger spans the entire document body.
      // scrub: true ties the progress value directly to scroll position
      // with no easing delay — the lerp in useFrame provides all the smoothing.
      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress
          // Derive and store the active section for sibling components
          activeSectionRef.current = getActiveSection(self.progress, CAMERA_KEYFRAMES)
          
          // Sync with the shared module-level state for R3F components
          scrollState.progress = self.progress
          scrollState.activeSection = activeSectionRef.current
        },
      })

      // Initialise scene fog for atmospheric depth transitions
      if (!scene.fog) {
        scene.fog = new THREE.FogExp2('#000000', 0)
      }

      return () => {
        trigger.kill()
        mql.removeEventListener('change', handler)
      }
    }
  }, [scene])

  // ─── Per-frame Camera Interpolation ───
  // Runs at display refresh rate (60/120/144 Hz). Reads the current scroll
  // progress and lerps the camera toward the target keyframe position.
  // The lerp factor (0.03) is deliberately low for a smooth, cinematic feel.
  useFrame(() => {
    // If user prefers reduced motion, lock camera at Hero position
    if (prefersReducedMotionRef.current) {
      const hero = CAMERA_KEYFRAMES[0]
      camera.position.set(...hero.position)
      camera.lookAt(...hero.target)
      return
    }

    const progress = scrollProgressRef.current
    const { from, to, t } = getInterpolatedKeyframe(progress, CAMERA_KEYFRAMES)

    // ─── Compute target position by interpolating between keyframes ───
    targetPosition.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], t),
      THREE.MathUtils.lerp(from.position[1], to.position[1], t),
      THREE.MathUtils.lerp(from.position[2], to.position[2], t)
    )

    targetLookAt.set(
      THREE.MathUtils.lerp(from.target[0], to.target[0], t),
      THREE.MathUtils.lerp(from.target[1], to.target[1], t),
      THREE.MathUtils.lerp(from.target[2], to.target[2], t)
    )

    // ─── Smooth camera movement (lerp toward targets) ───
    // The low lerp factor (0.03) means the camera never snaps — it
    // smoothly decelerates toward the target, creating a floaty,
    // cinematic feel even during fast scrolling.
    const lerpFactor = 0.03
    camera.position.lerp(targetPosition, lerpFactor)

    // Smoothly interpolate the lookAt target to prevent jerky rotation
    currentLookAt.lerp(targetLookAt, lerpFactor)
    camera.lookAt(currentLookAt)

    // ─── Atmospheric fog transition ───
    // Fog density increases as the user scrolls deeper into the page,
    // creating a gradual darkening that matches the "dark side" theme.
    if (scene.fog && scene.fog instanceof THREE.FogExp2) {
      const targetFogDensity = THREE.MathUtils.lerp(from.fogDensity, to.fogDensity, t)
      scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targetFogDensity, lerpFactor)
    }
  })

  // This component renders nothing — it only controls the camera
  return null
}
