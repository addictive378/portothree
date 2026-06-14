'use client'

/**
 * GlobalScene.tsx — Fixed fullscreen Three.js Canvas that persists across the entire website.
 *
 * ─── Architecture ───
 *
 * Layering Strategy:
 *   The portfolio uses a two-layer architecture:
 *
 *   1. BACKGROUND LAYER (z-index: 0) — This component.
 *      A position:fixed Canvas covering the entire viewport. It renders
 *      the Dark Side of the Moon prism scene (stars, beams, prism, lights)
 *      and stays visible at all times as the user scrolls. The camera
 *      moves in response to scroll via CameraController.
 *
 *   2. CONTENT LAYER (z-index: 10) — The HTML sections (Hero, About, etc.)
 *      These sit above the Canvas in the DOM stacking order. Each section
 *      has a transparent or semi-transparent background so the 3D scene
 *      bleeds through, creating depth. The sections scroll normally.
 *
 *   This separation means the R3F Canvas is mounted ONCE and never
 *   unmounts during navigation — no expensive WebGL context teardown,
 *   no flash of black between sections.
 *
 * Why position:fixed?
 *   A fixed Canvas stays in place while the DOM content scrolls over it.
 *   This is the standard technique for "parallax 3D background" sites.
 *   pointer-events:none ensures the Canvas never intercepts clicks meant
 *   for the content layer.
 *
 * SSR Safety:
 *   This is a 'use client' component. Three.js and WebGL require browser
 *   APIs (canvas, WebGL context) that don't exist during SSR. The
 *   'use client' directive ensures this component only runs in the browser.
 *   An additional mounted state guard prevents hydration mismatches.
 *
 * Future Scroll Storytelling Integration:
 *   The Scene graph (Scene.tsx) and CameraController already track the
 *   active SceneSection. To add per-section effects in the future:
 *   1. Read activeSectionRef inside any R3F child component
 *   2. Conditionally adjust visuals (e.g. prism glow colour, fog tint,
 *      particle density) based on the current section
 *   3. No architecture changes needed — just add new R3F children
 *
 * Performance:
 *   - The Canvas and all R3F children live in their own React subtree,
 *     isolated from DOM content re-renders.
 *   - Scene is wrapped in React.memo to prevent re-renders.
 *   - dpr clamped to [1, 2] to cap pixel density on high-DPI screens.
 *   - Suspense boundary catches async Three.js initialisation.
 *
 * Accessibility:
 *   - The Canvas is marked aria-hidden="true" since it is purely decorative.
 *   - pointer-events:none ensures keyboard and screen reader users are
 *     unaffected by the background layer.
 *   - CameraController respects prefers-reduced-motion internally.
 */

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

export default function GlobalScene() {
  // Guard against SSR hydration — Canvas requires browser APIs.
  // We mount only after the component is client-side hydrated.
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    // SSR / initial hydration: render a placeholder that matches layout
    return (
      <div
        className="fixed inset-0 z-0 h-screen w-screen bg-black"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="fixed inset-0 z-0 h-screen w-screen"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Suspense fallback while Three.js assets initialise */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        }
      >
        <Canvas
          camera={{
            position: [0, 0.3, 8],  // Matches Hero keyframe — no jump on load
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
          {/* The full scene graph — memoised to prevent re-renders */}
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
