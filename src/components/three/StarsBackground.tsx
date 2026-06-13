'use client'

/**
 * StarsBackground.tsx — Deep-space star field using Drei's Stars component.
 *
 * Configuration choices:
 *  - radius=120: Large sphere so stars appear far away and immersive
 *  - depth=60:   Deep field creates parallax-like layering
 *  - count=5000: Dense enough to feel like outer space without GPU strain
 *  - factor=5:   Larger star sizes for visibility against the dark bg
 *  - saturation=0.1: Nearly white stars — matches the monochrome aesthetic
 *                     of "The Dark Side of the Moon" cover
 *  - fade=true:  Stars fade with distance, creating natural depth
 *  - speed=0.8:  Slow subtle twinkling — calm, cinematic, not distracting
 */

import { Stars } from '@react-three/drei'

export default function StarsBackground() {
  return (
    <Stars
      radius={120}
      depth={60}
      count={5000}
      factor={5}
      saturation={0.1}
      fade
      speed={0.8}
    />
  )
}
