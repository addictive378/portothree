'use client'

/**
 * WhiteBeam.tsx — The incoming white light beam from the left side.
 *
 * Recreates the single white beam from "The Dark Side of the Moon" cover
 * that enters the prism from the lower-left and converges at the prism's
 * left face.
 *
 * Implementation:
 *  - A thin BoxGeometry stretched horizontally to form a beam shape.
 *  - meshBasicMaterial with additive blending for a natural glow effect.
 *    Basic material is intentional: light beams are self-emissive and
 *    should not be affected by scene lighting.
 *  - A second, wider "glow" mesh sits behind the beam with very low
 *    opacity, simulating atmospheric light scatter (bloom without
 *    post-processing).
 *
 * Animation:
 *  - Subtle intensity pulsing via useFrame, modulating the material
 *    opacity with a slow sine wave for a living, breathing feel.
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Configuration for the white beam's appearance and position */
const BEAM_CONFIG = {
  /** Total length of the beam */
  length: 6.0,
  /** Core beam thickness */
  coreWidth: 0.04,
  /** Glow halo thickness (wider than core) */
  glowWidth: 0.25,
  /** Depth (Z thickness) — kept thin for a flat beam look */
  depth: 0.02,
  /** Where the beam terminates (the prism's left face) */
  targetX: -0.7,
  /** Vertical position — slightly below centre to match prism geometry */
  targetY: -0.15,
  /** Angle of incidence — tilted upward slightly toward prism centre */
  angle: Math.PI / 14,
  /** Core beam base opacity */
  coreOpacity: 0.85,
  /** Glow halo base opacity */
  glowOpacity: 0.12,
} as const

export default function WhiteBeam() {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Memoised materials to prevent re-creation on every render
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: BEAM_CONFIG.coreOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  )

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: BEAM_CONFIG.glowOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  )

  // Animate a slow, elegant opacity pulse
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()

    // Sine wave oscillation: ±10% around the base opacity, ~5s cycle
    const pulse = Math.sin(elapsed * 0.4) * 0.1

    if (coreRef.current) {
      ;(coreRef.current.material as THREE.MeshBasicMaterial).opacity =
        BEAM_CONFIG.coreOpacity + pulse
    }
    if (glowRef.current) {
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        BEAM_CONFIG.glowOpacity + pulse * 0.3
    }
  })

  // Position the beam so its right edge meets the prism's left face.
  // The beam extends leftward from the target point.
  const beamX = BEAM_CONFIG.targetX - BEAM_CONFIG.length / 2

  return (
    <group
      position={[beamX, BEAM_CONFIG.targetY, 0]}
      rotation={[0, 0, BEAM_CONFIG.angle]}
    >
      {/* Core beam — bright, sharp white line */}
      <mesh ref={coreRef} material={coreMaterial}>
        <boxGeometry
          args={[BEAM_CONFIG.length, BEAM_CONFIG.coreWidth, BEAM_CONFIG.depth]}
        />
      </mesh>

      {/* Glow halo — wider, softer, atmospheric scatter effect */}
      <mesh ref={glowRef} material={glowMaterial}>
        <boxGeometry
          args={[BEAM_CONFIG.length, BEAM_CONFIG.glowWidth, BEAM_CONFIG.depth]}
        />
      </mesh>
    </group>
  )
}
