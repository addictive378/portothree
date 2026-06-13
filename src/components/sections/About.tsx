'use client'

import { TIMELINE_ITEMS } from '@/data/portfolio'
import { Card, CardContent } from '@/components/ui/card'

export default function About() {
  // Rainbow color list to cycle through for timeline bullet nodes
  const nodeColors = [
    'bg-rainbow-red shadow-[0_0_12px_rgba(255,0,85,0.4)]',
    'bg-rainbow-orange shadow-[0_0_12px_rgba(255,127,0,0.4)]',
    'bg-rainbow-green shadow-[0_0_12px_rgba(0,255,102,0.4)]',
  ]

  return (
    <section id="about" className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-rainbow-violet/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-orange uppercase mb-3">
            01. Background
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Journey & Philosophy
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-red to-rainbow-orange" />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Biography & Philosophy */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              Engineering the Light out of Darkness.
            </h3>
            
            <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
              <p>
                I am a creative developer who builds visual bridges between technology and art. My work is inspired by structured complexity, much like the beam of light that enters a prism and splits into its component frequencies.
              </p>
              <p>
                I specialize in crafting premium web applications that are highly functional, modular, and visually breathtaking. With expertise in Next.js 15, TypeScript, WebGL/Three.js, and GSAP, I turn flat screens into interactive portals.
              </p>
              
              <blockquote className="border-l-2 border-rainbow-yellow pl-4 py-1 text-white italic font-medium bg-white/5 rounded-r-lg pr-4">
                &ldquo;Breathe, breathe in the air. Don&apos;t be afraid to care.&rdquo; – We design experiences that leave a lasting emotional impression.
              </blockquote>
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-white mb-8">Professional History</h3>
            
            <div className="relative border-l border-white/10 pl-6 ml-2 space-y-10">
              {TIMELINE_ITEMS.map((item, index) => (
                <div key={item.company} className="relative group">
                  {/* Timeline Bullet Node with specific rainbow shadow */}
                  <span 
                    className={`absolute -left-[31px] top-1.5 flex h-4 w-4 rounded-full border border-black transition-transform duration-300 group-hover:scale-125 ${
                      nodeColors[index % nodeColors.length]
                    }`} 
                  />

                  {/* Glassmorphic timeline card */}
                  <Card className="glass-card rainbow-border-hover border border-white/5 transition-all duration-300 bg-white/5">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-rainbow-yellow transition-colors duration-200">
                            {item.role}
                          </h4>
                          <p className="text-sm font-semibold text-muted-foreground">
                            {item.company}
                          </p>
                        </div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/5 text-rainbow-orange whitespace-nowrap">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
