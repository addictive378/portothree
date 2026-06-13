'use client'

import { Stars } from '@react-three/drei'

export default function StarsBackground() {
  return (
    <Stars
      radius={100}      // Radius of the inner sphere
      depth={50}        // Starfield depth
      count={4000}      // Number of stars
      factor={4}        // Size factor
      saturation={0.5}  // Star color saturation
      fade={true}       // Fade into the distance
      speed={1}         // Star movement/twinkling speed
    />
  )
}
