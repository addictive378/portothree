'use client'

import { useState } from 'react'
import { Send, CheckCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Reusable ContactForm component handling local input state,
 * mock submission animations, validation, and layout.
 */
export default function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API request latency
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormState({ name: '', email: '', message: '' })

    // Reset success banner after 5 seconds
    setTimeout(() => setIsSuccess(false), 6000)
  }

  return (
    <div className="glass-card border border-white/5 bg-white/3 h-full rounded-2xl p-6 sm:p-8 text-left">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="contact-form-field space-y-2">
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold tracking-wider uppercase text-muted-foreground"
          >
            Your Name
          </label>
          <input
            type="text"
            id="contact-name"
            required
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            placeholder="Roger Waters"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/15 focus:border-rainbow-blue focus:outline-none focus:ring-1 focus:ring-rainbow-blue/50 transition-all duration-300 focus:bg-black/60"
            aria-required="true"
          />
        </div>

        {/* Email Field */}
        <div className="contact-form-field space-y-2">
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold tracking-wider uppercase text-muted-foreground"
          >
            Email Address
          </label>
          <input
            type="email"
            id="contact-email"
            required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            placeholder="roger@darkside.com"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/15 focus:border-rainbow-blue focus:outline-none focus:ring-1 focus:ring-rainbow-blue/50 transition-all duration-300 focus:bg-black/60"
            aria-required="true"
          />
        </div>

        {/* Message Field */}
        <div className="contact-form-field space-y-2">
          <label
            htmlFor="contact-message"
            className="block text-xs font-bold tracking-wider uppercase text-muted-foreground"
          >
            Your Message
          </label>
          <textarea
            id="contact-message"
            required
            rows={6}
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            placeholder="Transmit your query or project concept..."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/15 focus:border-rainbow-blue focus:outline-none focus:ring-1 focus:ring-rainbow-blue/50 transition-all duration-300 resize-none focus:bg-black/60"
            aria-required="true"
          />
        </div>

        {/* Success Alert Banner */}
        {isSuccess && (
          <div 
            className="flex items-center gap-3 rounded-xl border border-rainbow-green/30 bg-rainbow-green/10 p-4 text-xs font-semibold text-rainbow-green transition-all duration-300 animate-in fade-in"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>Signal transmitted successfully! Aligning channels shortly.</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="contact-form-field pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-rainbow-red via-rainbow-yellow via-rainbow-blue to-rainbow-violet text-black font-bold uppercase tracking-widest py-6 rounded-xl hover:shadow-[0_0_25px_rgba(0,136,255,0.4)] transition-all duration-300 disabled:opacity-50 hover:opacity-95"
            style={{ textShadow: '0 0 1px rgba(255,255,255,0.2)' }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                Transmitting Pulse...
                <RefreshCw className="h-4 w-4 animate-spin" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Signal
                <Send className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
