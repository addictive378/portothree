'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'

/**
 * Main floating MusicPlayer widget.
 * Controls an HTML5 <audio> element via React state and ref,
 * animating its entry on load using GSAP, and providing keyboard-accessible play/pause controls.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.2) // default volume 20%
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // ─── GSAP Entrance Animation ───
  useEffect(() => {
    // Fade in and slide up the floating widget 1.2s after page load completes
    if (playerRef.current) {
      gsap.fromTo(
        playerRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 1.5, // delay to allow primary hero animations to run first
        }
      )
    }
  }, [])

  // ─── Play / Pause Actions ───
  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.warn('Audio playback was blocked or interrupted:', err)
      })
    }
  }

  // ─── Mute Actions ───
  const handleMuteToggle = () => {
    if (!audioRef.current) return
    const nextMuteState = !isMuted
    audioRef.current.muted = nextMuteState
    setIsMuted(nextMuteState)
  }

  // ─── Volume Actions ───
  const handleVolumeChange = (newVolume: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = newVolume
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      audioRef.current.muted = false
      setIsMuted(false)
    }
  }

  // ─── Seek Actions ───
  const handleSeek = (time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  // ─── Audio Event Handlers ───
  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  // Sync state if audio ends (though we loop, safe fallback)
  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Sync initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return (
    <div
      ref={playerRef}
      className="fixed bottom-6 z-50 w-[calc(100%-2rem)] max-w-sm left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 md:w-80 opacity-0 transform"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Hidden HTML5 Audio Tag */}
      <audio
        ref={audioRef}
        src="/audio/ambient_drone.wav"
        preload="metadata"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Floating Glassmorphic Player Container */}
      <div 
        className="glass-card flex flex-col gap-4 p-5 rounded-2xl border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/10 hover:shadow-[0_12px_40px_rgba(255,0,85,0.06)] group"
        style={{ background: 'oklch(0 0 0 / 70%)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        {/* Subtle decorative rainbow gradient highlight on the top left */}
        <div 
          className="absolute -top-[1px] -left-[1px] w-24 h-[1px] bg-gradient-to-r from-rainbow-red via-rainbow-yellow to-transparent opacity-80"
          aria-hidden="true"
        />

        {/* 1. Player controls (buttons, volume, metadata) */}
        <PlayerControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          onPlayPause={handlePlayPause}
          onMuteToggle={handleMuteToggle}
          onVolumeChange={handleVolumeChange}
        />

        {/* 2. Audio progress tracking seek bar */}
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
      </div>
    </div>
  )
}
