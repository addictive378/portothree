'use client'

import { SKILLS_CATEGORIES } from '@/data/portfolio'
import { Card, CardContent } from '@/components/ui/card'

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute left-0 top-1/4 -z-10 h-80 w-80 rounded-full bg-rainbow-yellow/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-yellow uppercase mb-3">
            02. Capabilities
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            My Creative Spectrum
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-yellow to-rainbow-green" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SKILLS_CATEGORIES.map((category) => (
            <div key={category.title} className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-white tracking-wide border-b border-white/5 pb-3">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <Card 
                    key={skill.name} 
                    className="glass-card border border-white/5 bg-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
                    style={{
                      // Add a very subtle drop shadow matching the skill's specific spectrum color on hover
                      boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.4)`,
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-white">
                          {skill.name}
                        </span>
                        <span 
                          className="text-xs font-mono font-bold"
                          style={{ color: skill.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Skill progress bar container */}
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        {/* Progress Bar filled with the skill's specific spectrum color */}
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${skill.level}%`, 
                            backgroundColor: skill.color,
                            boxShadow: `0 0 8px ${skill.color}`
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
