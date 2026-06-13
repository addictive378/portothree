'use client'

/**
 * Scene.tsx — Main React Three Fiber Canvas and scene composition.
 *
 * This component wraps all 3D elements in a single Canvas and is designed
 * to be embedded inside the Hero section container. It composes:
 *  - StarsBackground: Deep-space star field
 *  - Lights: Multi-light cinematography rig
 *  - Prism: Rotating transparent glass prism
 *
 * Camera setup:
 *  - Position [0, 0, 6]: Pulls back enough to see the full prism
 *  - FOV 45: Slightly narrow for a cinematic look (less distortion)
 *
 * Performance considerations:
 *  - dpr clamped to [1, 2] to avoid excessive pixel density on 3x screens
 *  - antialias enabled for smooth prism edges
 *  - alpha: true so the canvas background is transparent, allowing the
 *    CSS background to show through (pure black #000)
 *  - Suspense boundary with a minimal loading spinner
 */

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Prism from './Prism'
import Lights from './Lights'
import StarsBackground from './StarsBackground'

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
            alpha: true,       // Transparent background
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          {/* Deep-space star field — rendered first (behind everything) */}
          <StarsBackground />

          {/* Multi-light cinematography rig */}
          <Lights />

          {/* Prism centred at the origin with rotation and floating animation */}
          <Prism />
        </Canvas>
      </Suspense>
    </div>
  )
}
