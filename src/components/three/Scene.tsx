'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Prism from './Prism'
import Lights from './Lights'
import StarsBackground from './StarsBackground'

// Light beams modeling the prism refraction from "The Dark Side of the Moon"
function Beams() {
  const whiteBeamColor = '#ffffff'
  const rainbowColors = [
    '#ff0055', // Red
    '#ff7f00', // Orange
    '#ffdd00', // Yellow
    '#00ff66', // Green
    '#0088ff', // Blue
    '#7a00ff', // Violet
  ]

  return (
    <group>
      {/* Incoming White Beam: Entering the left side of the prism */}
      <group position={[-0.6, -0.2, 0]} rotation={[0, 0, Math.PI / 9]}>
        <mesh position={[-2.5, 0, 0]}>
          <boxGeometry args={[5, 0.04, 0.04]} />
          <meshBasicMaterial color={whiteBeamColor} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Outgoing Rainbow Beams: Fanning out from the right side of the prism */}
      <group position={[0.6, -0.1, 0]}>
        {rainbowColors.map((color, index) => {
          // Spread angles from slightly up (+2 deg) to down (-25 deg)
          const angle = 0.04 - index * 0.055
          // Stagger the vertical exit point slightly to simulate refraction spread
          const yOffset = -index * 0.015
          
          return (
            <group key={color} position={[0, yOffset, 0]} rotation={[0, 0, angle]}>
              <mesh position={[2.5, 0, 0]}>
                <boxGeometry args={[5, 0.05, 0.015]} />
                <meshBasicMaterial color={color} transparent opacity={0.8} />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}

export default function Scene() {
  return (
    <div className="relative h-full w-full bg-black">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-rainbow-red border-r-transparent border-b-transparent border-l-transparent"></div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 2]} // Support high-DPI displays
          gl={{ antialias: true, alpha: false }}
        >
          {/* Stars background in outer space */}
          <StarsBackground />

          {/* Setup lights */}
          <Lights />

          {/* Setup the prism and beams */}
          <group position={[0, 0, 0]}>
            <Prism />
            <Beams />
          </group>
        </Canvas>
      </Suspense>

      {/* Ambient background glow to ground the 3D element */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_60%)]" />
    </div>
  )
}
