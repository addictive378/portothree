'use client'

/**
 * Scene.tsx — Main React Three Fiber Canvas and scene composition.
 *
 * Composes the complete "Dark Side of the Moon" scene:
 *  1. StarsBackground — Deep-space star field (furthest layer)
 *  2. Lights — Multi-light cinematography rig
 *  3. WhiteBeam — Incoming white light from the left
 *  4. Prism — Rotating transparent glass prism at the centre
 *  5. RainbowSpectrum — Seven ROYGBIV beams fanning out to the right
 *
 * The beams are positioned in world space (not parented to the prism group)
 * so they remain fixed while the prism slowly rotates between them — this
 * matches the iconic album cover composition where the beams are static
 * and the prism sits at the intersection point.
 *
 * Camera setup:
 *  - Position [0, 0, 6]: Far enough to frame the full beam spread
 *  - FOV 45: Slightly narrow for a cinematic, compressed perspective
 *
 * Performance:
 *  - dpr clamped to [1, 2] to cap pixel density on high-DPI screens
 *  - antialias on for smooth prism edges
 *  - alpha: true for transparent canvas background (CSS bg shows through)
 *  - Suspense boundary catches async Three.js initialisation
 */

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Prism from './Prism'
import Lights from './Lights'
import StarsBackground from './StarsBackground'
import WhiteBeam from './WhiteBeam'
import RainbowSpectrum from './RainbowSpectrum'

export default function Scene() {
  return (
    <div className="relative h-full w-full">
      {/* Suspense fallback while Three.js assets initialise */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        }
      >
        <Canvas
          camera={{
            position: [0, 0, 6],
            fov: 45,
            near: 0.1,
            far: 200,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          {/* Layer 1: Deep-space star field (behind everything) */}
          <StarsBackground />

          {/* Layer 2: Cinematography lighting rig */}
          <Lights />

          {/*
           * Layer 3: The complete refraction composition.
           * Beam → Prism → Spectrum are siblings in world space so the
           * beams stay fixed while the prism rotates independently.
           */}
          <WhiteBeam />
          <Prism />
          <RainbowSpectrum />
        </Canvas>
      </Suspense>
    </div>
  )
}

