/**
 * scrollStore.ts — Zero-overhead shared scroll state for R3F components.
 *
 * Architecture:
 *   This is a simple module-level mutable store — NOT React state, NOT
 *   a context, NOT a hook. It's a plain JavaScript object that components
 *   read synchronously inside useFrame callbacks.
 *
 *   CameraController writes to this store once per ScrollTrigger tick.
 *   All other R3F components (Prism, WhiteBeam, RainbowSpectrum,
 *   SceneOrchestrator) read from it inside their own useFrame loops.
 *
 * Why not React state/context?
 *   React state triggers re-renders. Context triggers consumer re-renders.
 *   Both are poison for 60fps R3F animation loops. A module-level mutable
 *   variable is read in O(1) with zero React overhead — the same pattern
 *   used by zustand's vanilla store and leva's internal state.
 *
 * Why not a ref?
 *   A ref is scoped to a single component. This store needs to be readable
 *   by multiple sibling components that don't share a common parent ref.
 */

import type { SceneSection } from '@/types'

/**
 * Shared mutable scroll state.
 * Written by CameraController, read by R3F scene components in useFrame.
 */
export const scrollState = {
  /** Normalised scroll progress: 0 = top of page, 1 = bottom */
  progress: 0,

  /** Currently active portfolio section based on scroll position */
  activeSection: 'hero' as SceneSection,

  /** Beam intensity multiplier (0–1). Controls WhiteBeam & RainbowSpectrum opacity. */
  beamIntensity: 1.0,

  /** Prism rotation speed multiplier. 1.0 = default, higher = faster orbit. */
  rotationSpeed: 1.0,
}
