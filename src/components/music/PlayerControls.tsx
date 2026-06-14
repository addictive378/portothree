'use client'

import React from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export interface PlayerControlsProps {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  onPlayPause: () => void
  onMuteToggle: () => void
  onVolumeChange: (volume: number) => void
}

/**
 * PlayerControls component providing buttons for playback toggle, volume, and mute.
 * Built with full accessibility (aria-labels, keyboard slider interaction).
 */
export default function PlayerControls({
  isPlaying,
  isMuted,
  volume,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
}: PlayerControlsProps) {
  
  // Handle volume change from slider
  const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    onVolumeChange(value)
  }

  // Handle keyboard events on volume slider
  const handleVolumeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const step = 0.05
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onVolumeChange(Math.min(volume + step, 1))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onVolumeChange(Math.max(volume - step, 0))
    }
  }

  return (
    <div className="flex items-center justify-between w-full gap-4">
      {/* 1. Play / Pause Button with scale feedack */}
      <button
        onClick={onPlayPause}
        className="play-pause-btn flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-white/95 hover:scale-105 active:scale-95 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-black text-black" />
        ) : (
          <Play className="w-4 h-4 fill-black text-black translate-x-[1px]" />
        )}
      </button>

      {/* 2. Title & Status Tracker */}
      <div className="flex-grow text-left overflow-hidden select-none">
        <span className="block text-[10px] font-bold tracking-widest text-rainbow-red uppercase animate-pulse">
          Ambient Signal
        </span>
        <span className="block text-xs font-semibold text-white/90 truncate">
          {isPlaying ? 'Receiving frequency...' : 'Feed suspended'}
        </span>
      </div>

      {/* 3. Mute & Volume Control Group */}
      <div className="flex items-center gap-2">
        {/* Mute toggle button */}
        <button
          onClick={onMuteToggle}
          className="mute-btn p-2 rounded-lg bg-white/5 border border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/10 active:scale-95 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-white/20"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        {/* Volume Slider */}
        <div className="relative w-20 flex items-center group">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeSlider}
            onKeyDown={handleVolumeKeyDown}
            className="w-full h-1 bg-white/15 rounded-full appearance-none cursor-pointer outline-none group-focus-within:h-1.5 focus:h-1.5 focus:ring-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 transition-all duration-300"
            aria-label="Volume controller"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
          />
        </div>
      </div>
    </div>
  )
}
