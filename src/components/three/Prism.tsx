'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Prism() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Rotate the prism slowly on every frame
  useFrame((state) => {
    if (meshRef.current) {
      // Slow rotation on Y axis
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
      // Subtle float oscillation up and down
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1
    }
  })

  return (
    <group>
      {/* 3D Glass Prism: A cylinder with 3 radial segments forms a triangular prism */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        // Rotate on X by 90deg to orient the triangular face to the camera
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[1.2, 1.2, 1.8, 3]} />
        <meshPhysicalMaterial
          roughness={0.05}
          transmission={0.9} // Glass translucency
          thickness={1.5}    // Glass refractive thickness
          ior={1.5}          // Glass Index of Refraction
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={1}
        />
      </mesh>
    </group>
  )
}
