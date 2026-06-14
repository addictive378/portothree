'use client'

/**
 * Scene.tsx — Pure scene graph composition (no Canvas).
 *
 * This component defines WHAT is in the 3D world but NOT the Canvas that
 * renders it. The Canvas is now owned by GlobalScene.tsx, which mounts it
 * as a position:fixed fullscreen layer behind all DOM content.
 *
 * Scene graph layers:
 *  1. StarsBackground — Deep-space star field (furthest layer)
 *  2. Lights — Multi-light cinematography rig
 *  3. WhiteBeam — Incoming white light from the left
 *  4. Prism — Rotating transparent glass prism at the centre
 *  5. RainbowSpectrum — Seven ROYGBIV beams fanning out to the right
 *  6. CameraController — Scroll-driven cinematic camera journey
 *
 * Performance:
 *  - This component is wrapped in React.memo by GlobalScene to prevent
 *    unnecessary re-renders when parent DOM state changes.
 *  - All child components use useRef/useFrame for animations,
 *    ensuring zero React re-renders during runtime.
 */

import { memo } from 'react'
import Lights from './Lights'
import StarsBackground from './StarsBackground'
import SceneOrchestrator from './SceneOrchestrator'
import CameraController from './CameraController'

/**
 * Memoised scene graph. Since none of the child components accept props
 * that change at runtime, this memo boundary prevents the entire scene
 * from re-rendering when the DOM content layer triggers React updates.
 */
const Scene = memo(function Scene() {
  return (
    <>
      {/* Layer 1: Deep-space star field (behind everything) */}
      <StarsBackground />

      {/* Layer 2: Cinematography lighting rig */}
      <Lights />

      {/*
       * Layer 3: The complete refraction composition, orchestrated.
       * Includes WhiteBeam, Prism, and RainbowSpectrum.
       * Automatically positioned, scaled, and animated based on page scroll.
       */}
      <SceneOrchestrator />

      {/*
       * Layer 4: Scroll-driven camera controller.
       * Reads page scroll via GSAP ScrollTrigger and smoothly
       * interpolates the camera through cinematic keyframes.
       * Must be a child of Canvas to access the R3F context.
       */}
      <CameraController />
    </>
  )
})

export default Scene
