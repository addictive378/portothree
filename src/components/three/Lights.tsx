'use client'

export default function Lights() {
  return (
    <>
      {/* Soft overall ambient light */}
      <ambientLight intensity={0.3} />

      {/* Main directional light acting as the key light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={2.0}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Rim light from behind to highlight the glass edges */}
      <pointLight position={[-10, 0, -5]} intensity={1.5} color="#ffffff" />

      {/* Subtle colorful point lights to create interest in the glass reflections */}
      <pointLight position={[0, -2, 2]} intensity={1.0} color="#ff0055" />
      <pointLight position={[2, 2, -2]} intensity={1.0} color="#0088ff" />
    </>
  )
}
