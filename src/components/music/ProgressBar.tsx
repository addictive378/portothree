'use client'

import React from 'react'

export interface ProgressBarProps {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

/**
 * Formats time in seconds to mm:ss format.
 */
export const formatTime = (time: number) => {
  if (isNaN(time) || time === Infinity) return '00:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/**
 * ProgressBar Component for the music player.
 * Implements keyboard accessibility for seeking (ArrowLeft/ArrowRight) and ARIA slider attributes.
 */
export default function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  // Click on the bar to jump/seek
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, clickX / rect.width))
    onSeek(percent * duration)
  }

  // Keyboard navigation support for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 5 // Seek 5 seconds at a time
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      onSeek(Math.min(currentTime + step, duration))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      onSeek(Math.max(currentTime - step, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      onSeek(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      onSeek(duration)
    }
  }

  return (
    <div className="flex items-center gap-3 w-full text-xs font-mono text-muted-foreground select-none">
      {/* Current Time */}
      <span className="w-10 text-right shrink-0">{formatTime(currentTime)}</span>

      {/* Progress Track */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Audio progress tracker"
        aria-valuemin={0}
        aria-valuemax={duration || 100}
        aria-valuenow={currentTime}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        className="relative flex-grow h-1.5 bg-white/10 rounded-full cursor-pointer group outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300"
      >
        {/* Animated fill track using Pink Floyd spectrum gradient */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-rainbow-red via-rainbow-yellow via-rainbow-green via-rainbow-blue to-rainbow-violet shadow-[0_0_8px_rgba(0,136,255,0.4)]"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Hover Seeker Indicator Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-black shadow-lg scale-0 group-hover:scale-100 group-focus-visible:scale-100 transition-all duration-200"
          style={{ left: `calc(${progressPercent}% - 6px)` }}
        />
      </div>

      {/* Total Duration */}
      <span className="w-10 text-left shrink-0">{formatTime(duration)}</span>
    </div>
  )
}
