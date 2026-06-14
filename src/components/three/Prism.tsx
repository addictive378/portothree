'use client'

/**
 * Prism.tsx — The centrepiece of the Dark Side of the Moon scene.
 *
 * Creates a triangular glass prism using a CylinderGeometry with 3 radial
 * segments (which produces a triangle cross-section). The mesh uses
 * meshPhysicalMaterial with high transmission to simulate transparent glass
 * with realistic refraction and reflectivity.
 *
 * Animation:
 *  - Slow continuous rotation on the Y axis (cinematic feel)
 *  - Gentle sinusoidal floating on the Y position (weightlessness)
 *  - Rotation speed is modulated by scrollState.rotationSpeed, written
 *    by SceneOrchestrator per section (e.g. faster during Skills).
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from './scrollStore'

export default function Prism() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Tracks accumulated rotation angle. Using a ref instead of
  // elapsed * speed means the rotation stays smooth when speed changes
  // mid-scroll — no sudden jumps.
  const accumulatedRotation = useRef(0)

  // Pre-compute the initial X rotation so the triangular face is oriented
  // towards the camera. We memoise to avoid recalculating every render.
  const initialRotation = useMemo(
    () => new THREE.Euler(Math.PI / 2, 0, 0),
    []
  )

  // Per-frame animation loop — runs at display refresh rate
  useFrame((state, delta) => {
    if (!meshRef.current) return

    const elapsed = state.clock.getElapsedTime()

    // Accumulate rotation using delta * speed instead of elapsed * constant.
    // This way, when rotationSpeed changes (via SceneOrchestrator writing to
    // scrollStore), the prism smoothly adjusts its orbit rate without jumping.
    const baseSpeed = 0.12 // rad/s at rotationSpeed = 1.0
    accumulatedRotation.current += delta * baseSpeed * scrollState.rotationSpeed

    meshRef.current.rotation.y = accumulatedRotation.current

    // Gentle floating oscillation (±0.15 units over a ~4s cycle)
    meshRef.current.position.y = Math.sin(elapsed * 0.6) * 0.15
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={initialRotation}
    >
      {/*
       * CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
       * Setting radialSegments=3 creates a triangular cross-section — a prism.
       * The height (depth) of 2.0 gives a nice chunky glass body.
       */}
      <cylinderGeometry args={[1.4, 1.4, 2.0, 3]} />

      {/*
       * meshPhysicalMaterial simulates physically-based glass:
       *  - transmission: how much light passes through (0.95 = highly transparent)
       *  - thickness: simulated glass depth for refraction distortion
       *  - roughness: low = mirror-smooth surface
       *  - ior: index of refraction (1.5 ≈ crown glass)
       *  - reflectivity: subtle mirror reflections on the surface
       *  - clearcoat: additional specular layer on top
       *  - envMapIntensity: how strongly the prism picks up environment lighting
       */}
      <meshPhysicalMaterial
        color="#ffffff"
        transmission={0.95}
        thickness={2.0}
        roughness={0.02}
        ior={1.5}
        reflectivity={0.5}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        envMapIntensity={1.2}
        attenuationColor="#ffffff"
        attenuationDistance={2}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
