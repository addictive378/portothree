'use client'

/**
 * Lights.tsx — Lighting rig for the Dark Side prism scene.
 *
 * The setup uses three light types working together:
 *
 * 1. AmbientLight — Provides a low base illumination so nothing is fully black.
 *    Kept dim to preserve the dark-space atmosphere.
 *
 * 2. DirectionalLight — Acts as the "key light" from the upper-right.
 *    This is the primary light source that creates highlights and specular
 *    reflections on the glass prism surface.
 *
 * 3. PointLights — Multiple coloured point lights placed at strategic
 *    positions around the prism. These serve two purposes:
 *    - Rim lighting to silhouette the prism edges against the dark background
 *    - Subtle colour tints that appear in the glass reflections, hinting
 *      at the rainbow refraction theme before actual light beams are added
 */

export default function Lights() {
  return (
    <>
      {/* Base ambient illumination — very subtle so the scene stays dark */}
      <ambientLight intensity={0.15} />

      {/*
       * Key directional light — upper-right position.
       * High intensity to create strong specular highlights on the glass.
       * Simulates a distant light source like a star.
       */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#ffffff"
      />

      {/*
       * Back-rim point light — placed behind and to the left of the prism.
       * Creates a bright edge highlight that separates the prism silhouette
       * from the dark background (classic cinematography rim light technique).
       */}
      <pointLight
        position={[-6, 2, -4]}
        intensity={2.0}
        color="#ffffff"
        distance={20}
        decay={2}
      />

      {/*
       * Warm accent light — subtle red/pink tint from below.
       * Adds colour variation to the glass reflections and hints at the
       * "red" end of the rainbow spectrum.
       */}
      <pointLight
        position={[0, -3, 3]}
        intensity={0.8}
        color="#ff3366"
        distance={15}
        decay={2}
      />

      {/*
       * Cool accent light — subtle blue tint from the upper-left.
       * Complements the warm accent and adds depth to the glass refraction.
       * Represents the "blue/violet" end of the spectrum.
       */}
      <pointLight
        position={[-3, 3, 2]}
        intensity={0.6}
        color="#4488ff"
        distance={15}
        decay={2}
      />

      {/*
       * Fill light from the right — very dim, just enough to prevent
       * the right side of the prism from going completely dark.
       */}
      <pointLight
        position={[4, 0, 3]}
        intensity={0.4}
        color="#ffffff"
        distance={12}
        decay={2}
      />
    </>
  )
}
