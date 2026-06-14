'use client'

/**
 * SceneOrchestrator.tsx — Section-aware prism composition controller.
 *
 * Architecture:
 *   Wraps the Prism, WhiteBeam, and RainbowSpectrum in a single <group>.
 *   Each frame, reads the shared scrollStore.progress and interpolates
 *   the group's position, scale, and scene parameters between section
 *   keyframes. This makes the prism feel like a guide through the website
 *   journey — moving aside for content, growing for impact sections, and
 *   fading into the distance at the end.
 *
 * Section-Specific Design Decisions:
 *
 *   Hero:     Large prism shifted right so hero text on the left is readable.
 *             Full beam intensity — this is the dramatic first impression.
 *
 *   About:    Prism shrinks and drifts further right and down. Low beam
 *             intensity so the glassmorphic cards and profile image aren't
 *             visually competed with.
 *
 *   Skills:   Prism moves upward and right. Rotation speeds up for a
 *             subtle orbital feel that matches the "spectrum of skills" theme.
 *
 *   Projects: Prism grows slightly more prominent again — the portfolio
 *             showcase deserves visual energy. Shifted center-right.
 *
 *   Contact:  Prism recedes far upward and back into the void. Very low
 *             intensity. The journey ends in darkness — "Eclipse".
 *
 * Performance:
 *   - Reads scrollStore (a module-level mutable) in useFrame — zero React overhead.
 *   - Lerps all values for smooth transitions. No GSAP timeline needed here;
 *     the useFrame lerp IS the animation system.
 *   - Reusable THREE.Vector3 instances allocated once via useMemo.
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Prism from './Prism'
import WhiteBeam from './WhiteBeam'
import RainbowSpectrum from './RainbowSpectrum'
import { scrollState } from './scrollStore'

// ─── Scene Keyframe Type ───
// Defines the visual state of the prism group at each section boundary.
interface SceneKeyframe {
  progress: number
  position: [number, number, number]
  scale: number          // Uniform scale factor
  beamIntensity: number  // 0–1 multiplier on beam opacity
  rotationSpeed: number  // Multiplier on prism rotation speed
}

/**
 * Scene composition keyframes — one per portfolio section.
 *
 * Each keyframe defines where the prism group should be and how
 * intense/fast its effects should be at that scroll position.
 * Values between keyframes are linearly interpolated, then smoothed
 * with a lerp in useFrame for cinematic transitions.
 */
const SCENE_KEYFRAMES: SceneKeyframe[] = [
  {
    // Hero: Large, center-right. Dramatic entrance.
    progress: 0.0,
    position: [2.0, 0, 0],
    scale: 1.15,
    beamIntensity: 1.0,
    rotationSpeed: 1.0,
  },
  {
    // About: Smaller, pushed right and down. Content-supportive.
    progress: 0.25,
    position: [3.5, -0.8, -1],
    scale: 0.6,
    beamIntensity: 0.35,
    rotationSpeed: 0.6,
  },
  {
    // Skills: Moved up-right. Faster orbit for energy.
    progress: 0.5,
    position: [3.2, 1.5, -0.5],
    scale: 0.55,
    beamIntensity: 0.45,
    rotationSpeed: 1.5,
  },
  {
    // Projects: Returns more prominent. Visual energy for portfolio showcase.
    progress: 0.75,
    position: [2.8, 0.2, 0.5],
    scale: 0.8,
    beamIntensity: 0.65,
    rotationSpeed: 0.8,
  },
  {
    // Contact: Recedes far upward and back. Atmospheric fade.
    progress: 1.0,
    position: [0, 2.5, -4],
    scale: 0.35,
    beamIntensity: 0.15,
    rotationSpeed: 0.3,
  },
]

/**
 * Interpolates between two bracketing keyframes for a given progress.
 */
function interpolateKeyframes(
  progress: number,
  keyframes: SceneKeyframe[]
): { from: SceneKeyframe; to: SceneKeyframe; t: number } {
  const p = Math.max(0, Math.min(1, progress))

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
  const range = to.progress - from.progress
  const t = range > 0 ? (p - from.progress) / range : 0

  return { from, to, t }
}

export default function SceneOrchestrator() {
  const groupRef = useRef<THREE.Group>(null)

  // Reusable vector for position lerping — allocated once
  const targetPos = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (!groupRef.current) return

    const progress = scrollState.progress
    const { from, to, t } = interpolateKeyframes(progress, SCENE_KEYFRAMES)

    // ─── Compute interpolated target values ───
    const targetX = THREE.MathUtils.lerp(from.position[0], to.position[0], t)
    const targetY = THREE.MathUtils.lerp(from.position[1], to.position[1], t)
    const targetZ = THREE.MathUtils.lerp(from.position[2], to.position[2], t)
    const targetScale = THREE.MathUtils.lerp(from.scale, to.scale, t)
    const targetIntensity = THREE.MathUtils.lerp(from.beamIntensity, to.beamIntensity, t)
    const targetRotSpeed = THREE.MathUtils.lerp(from.rotationSpeed, to.rotationSpeed, t)

    // ─── Smooth lerp toward targets ───
    // Factor 0.04 gives a slightly faster response than the camera (0.03)
    // so the prism "leads" the camera slightly — feels more alive.
    const lerpFactor = 0.04

    // Position
    targetPos.set(targetX, targetY, targetZ)
    groupRef.current.position.lerp(targetPos, lerpFactor)

    // Scale (uniform)
    const currentScale = groupRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, lerpFactor)
    groupRef.current.scale.setScalar(newScale)

    // ─── Write derived values to scrollStore for child components ───
    // WhiteBeam and RainbowSpectrum read these in their own useFrame loops
    // to modulate their material opacity. Prism reads rotationSpeed.
    scrollState.beamIntensity = THREE.MathUtils.lerp(
      scrollState.beamIntensity,
      targetIntensity,
      lerpFactor
    )
    scrollState.rotationSpeed = THREE.MathUtils.lerp(
      scrollState.rotationSpeed,
      targetRotSpeed,
      lerpFactor
    )
  })

  return (
    <group ref={groupRef}>
      {/*
       * The complete refraction composition as a movable unit.
       * WhiteBeam → Prism → RainbowSpectrum are siblings in local space.
       * Moving/scaling this group moves the entire prism scene coherently.
       */}
      <WhiteBeam />
      <Prism />
      <RainbowSpectrum />
    </group>
  )
}
