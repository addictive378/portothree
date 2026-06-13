'use client'

import { useState } from 'react'
import { Send, MapPin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    setFormState({ name: '', email: '', message: '' })
    
    // Reset success banner after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section id="contact" className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute left-1/3 bottom-0 -z-10 h-96 w-96 rounded-full bg-rainbow-violet/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
          <h2 className="text-xs font-bold tracking-widest text-rainbow-violet uppercase mb-3">
            04. Communication
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Initiate Alignment
          </p>
          <div className="mt-4 mx-auto h-[1px] w-20 bg-gradient-to-r from-rainbow-blue to-rainbow-violet" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Info panel */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Let&apos;s build the spectrum together.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you have a product concept that needs immersive 3D animation, a premium Web application, or just want to discuss art and technology, feel free to reach out.
              </p>
            </div>

            <div className="space-y-6">
              {/* Location item */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-rainbow-blue">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</h4>
                  <p className="text-sm font-semibold text-white">London, UK / Remote</p>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-rainbow-violet">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</h4>
                  <a href="mailto:contact@example.com" className="text-sm font-semibold text-white hover:text-rainbow-violet transition-colors">
                    contact@example.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quote of the Moon album */}
            <div className="border border-white/5 bg-white/5 rounded-xl p-6 glass-card">
              <p className="text-xs italic text-muted-foreground">
                &ldquo;There is no dark side of the moon really. Matter of fact it&apos;s all dark.&rdquo;
              </p>
              <span className="block mt-2 text-[10px] font-mono tracking-widest text-white/40 uppercase">
                — Eclipse (1973)
              </span>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <Card className="glass-card border border-white/5 bg-white/5 h-full">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold tracking-wider uppercase text-muted-foreground mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Pink Floyd"
                      className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-rainbow-blue focus:outline-none focus:ring-1 focus:ring-rainbow-blue/50 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold tracking-wider uppercase text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="floyd@darkside.com"
                      className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-rainbow-blue focus:outline-none focus:ring-1 focus:ring-rainbow-blue/50 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold tracking-wider uppercase text-muted-foreground mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Say something inspiring..."
                      className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder-white/20 focus:border-rainbow-blue focus:outline-none focus:ring-1 focus:ring-rainbow-blue/50 transition-all duration-300 resize-none"
                    />
                  </div>

                  {isSuccess && (
                    <div className="rounded-lg border border-rainbow-green/30 bg-rainbow-green/10 p-4 text-xs font-semibold text-rainbow-green transition-all duration-300">
                      Message successfully transmitted! I&apos;ll align with you shortly.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-rainbow-blue text-black font-bold uppercase tracking-widest py-6 rounded-lg hover:shadow-[0_0_20px_rgba(0,136,255,0.3)] transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Transmitting...'
                    ) : (
                      <span className="flex items-center gap-2">
                        Transmit Pulse
                        <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
