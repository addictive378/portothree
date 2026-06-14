'use client'

/**
 * RainbowSpectrum.tsx — The outgoing rainbow light beams from the prism.
 *
 * Recreates the iconic fanned-out spectrum from "The Dark Side of the Moon"
 * cover. Seven beams (ROYGBIV) exit the prism's right face and spread
 * outward at increasing angles.
 *
 * Implementation:
 *  - Each beam is a thin BoxGeometry with meshBasicMaterial + additive
 *    blending (self-emissive, not affected by scene lights).
 *  - Each beam has a matching wider glow mesh for atmospheric scatter.
 *  - All seven beams originate from the same exit point on the prism's
 *    right face and fan outward at evenly distributed angles.
 *
 * Animation:
 *  - A slow shimmer effect: each beam's opacity oscillates with a
 *    sine wave, but phase-shifted per beam index so the shimmer
 *    ripples across the spectrum like a wave.
 *  - The overall effect is a gentle, living rainbow — cinematic
 *    without being distracting.
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from './scrollStore'

/**
 * The 7 spectrum colours (ROYGBIV) with their target fan-out angles.
 * Angles are in radians, measured from the horizontal.
 * Red is the least refracted (smallest angle), violet the most.
 */
const SPECTRUM_BEAMS = [
  { color: '#ff0044', name: 'Red',    angle: 0.045 },
  { color: '#ff7700', name: 'Orange', angle: 0.015 },
  { color: '#ffdd00', name: 'Yellow', angle: -0.015 },
  { color: '#00ff66', name: 'Green',  angle: -0.045 },
  { color: '#0099ff', name: 'Blue',   angle: -0.075 },
  { color: '#4400ff', name: 'Indigo', angle: -0.105 },
  { color: '#8800cc', name: 'Violet', angle: -0.135 },
] as const

/** Configuration for the spectrum beams */
const SPECTRUM_CONFIG = {
  /** Length of each rainbow beam */
  length: 6.0,
  /** Core beam thickness */
  coreWidth: 0.035,
  /** Glow halo thickness */
  glowWidth: 0.18,
  /** Z depth (kept thin for flat beam aesthetic) */
  depth: 0.015,
  /** X position where beams exit the prism (right face) */
  exitX: 0.7,
  /** Y position of the exit point */
  exitY: -0.1,
  /** Core beam base opacity */
  coreOpacity: 0.75,
  /** Glow halo base opacity */
  glowOpacity: 0.15,
} as const

/**
 * A single spectrum beam with core + glow layers.
 * Extracted as a separate component so each beam manages its own
 * material refs independently (no shared mutation).
 */
function SpectrumBeam({
  color,
  angle,
  index,
}: {
  color: string
  angle: number
  index: number
}) {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Memoised materials — one per beam, prevents GC thrashing
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: SPECTRUM_CONFIG.coreOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: SPECTRUM_CONFIG.glowOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  )

  /**
   * Shimmer animation — each beam pulses at the same frequency but
   * with a phase offset proportional to its index. This creates a
   * wave-like shimmer that ripples across the spectrum from red to violet.
   *
   * Frequency: ~0.5 Hz (gentle)
   * Amplitude: ±8% opacity
   * Phase shift: 0.4 radians per beam index
   */
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const phaseOffset = index * 0.4
    const shimmer = Math.sin(elapsed * 0.5 + phaseOffset) * 0.08

    if (coreRef.current) {
      ;(coreRef.current.material as THREE.MeshBasicMaterial).opacity =
        (SPECTRUM_CONFIG.coreOpacity + shimmer) * scrollState.beamIntensity
    }
    if (glowRef.current) {
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        (SPECTRUM_CONFIG.glowOpacity + shimmer * 0.4) * scrollState.beamIntensity
    }
  })

  // Position beam so its left edge starts at the prism exit point,
  // then extends rightward
  const beamX = SPECTRUM_CONFIG.length / 2

  return (
    <group rotation={[0, 0, angle]}>
      {/* Core beam — vivid coloured line */}
      <mesh ref={coreRef} position={[beamX, 0, 0]} material={coreMaterial}>
        <boxGeometry
          args={[
            SPECTRUM_CONFIG.length,
            SPECTRUM_CONFIG.coreWidth,
            SPECTRUM_CONFIG.depth,
          ]}
        />
      </mesh>

      {/* Glow halo — wider, softer coloured glow */}
      <mesh ref={glowRef} position={[beamX, 0, 0]} material={glowMaterial}>
        <boxGeometry
          args={[
            SPECTRUM_CONFIG.length,
            SPECTRUM_CONFIG.glowWidth,
            SPECTRUM_CONFIG.depth,
          ]}
        />
      </mesh>
    </group>
  )
}

export default function RainbowSpectrum() {
  return (
    <group position={[SPECTRUM_CONFIG.exitX, SPECTRUM_CONFIG.exitY, 0]}>
      {SPECTRUM_BEAMS.map((beam, index) => (
        <SpectrumBeam
          key={beam.name}
          color={beam.color}
          angle={beam.angle}
          index={index}
        />
      ))}
    </group>
  )
}
