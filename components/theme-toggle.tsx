"use client"

import type React from "react"

import { Moon, Music, Play, Pause, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaDiscord } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-black/50 hover:bg-black/70 border-border/40 rounded-lg w-10 h-10 flex items-center justify-center cursor-default text-white"
      aria-label="Theme (Dark Mode)"
    >
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  )
}

export function MusicButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [textWidth, setTextWidth] = useState(0)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const songTitle = "Dolphins"

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      setAudioLoaded(true)
      audio.volume = 0.15 // %50 düşürülmüş ses seviyesi (0.3'ten 0.15'e)

      // Otomatik başlatma denemesi
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log("Autoplay prevented, waiting for user interaction:", error)
          setIsPlaying(false)
        })
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Kullanıcı etkileşimi ile otomatik başlatma (eğer autoplay engellenmişse)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && audioLoaded && !isPlaying) {
        audioRef.current.volume = 0.15
        audioRef.current.play().catch(console.log)
      }
    }

    document.addEventListener("click", handleFirstInteraction, { once: true })
    document.addEventListener("keydown", handleFirstInteraction, { once: true })
    document.addEventListener("touchstart", handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [audioLoaded, isPlaying])

  // Text genişliğini ölç
  useEffect(() => {
    if (textRef.current && isExpanded) {
      const rect = textRef.current.getBoundingClientRect()
      setTextWidth(rect.width)
    }
  }, [isExpanded, songTitle])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleMusicControl = async (e: React.MouseEvent) => {
    e.stopPropagation() // Event bubbling'i önle

    if (!audioRef.current || !audioLoaded) return

    try {
      if (isPlaying) {
        // Müziği durdur
        audioRef.current.pause()
      } else {
        // Müziği başlat
        audioRef.current.volume = 0.15 // %50 düşürülmüş ses seviyesi
        await audioRef.current.play()
      }
    } catch (error) {
      console.log("Audio control failed:", error)
    }
  }

  // Dinamik genişlik hesaplama
  const expandedWidth = textWidth + 120

  return (
    <>
      <audio ref={audioRef} src="/dolphins.mp3" preload="auto" loop playsInline />

      {/* Gizli text ölçümü için */}
      <span
        ref={textRef}
        className="absolute invisible text-sm font-medium tracking-wide"
        style={{ whiteSpace: "nowrap" }}
      >
        {songTitle}
      </span>

      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? `${Math.max(expandedWidth, 180)}px` : "40px",
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="bg-black/50 hover:bg-black/70 border border-border/40 rounded-lg h-10 flex items-center overflow-hidden"
      >
        {/* Music Icon Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleExpanded}
          className="text-white hover:bg-transparent h-10 w-10 flex-shrink-0"
          aria-label={isExpanded ? "Collapse music player" : "Expand music player"}
        >
          <Music className="h-[1.2rem] w-[1.2rem]" />
        </Button>

        {/* Expanded Content - Song Title with Play/Pause Button */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex items-center justify-between flex-1 min-w-0 px-3"
            >
              {/* Song Title */}
              <div className="flex items-center h-6 flex-1 justify-start">
                <span className="text-white text-sm font-medium tracking-wide whitespace-nowrap">{songTitle}</span>
              </div>

              {/* Play/Pause Control Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMusicControl}
                disabled={!audioLoaded}
                className="text-white hover:bg-white/10 h-8 w-8 flex-shrink-0 transition-colors duration-200 disabled:opacity-50"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

export function GitBookButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => window.open("https://gitbook.com", "_blank")}
      className="bg-black/50 hover:bg-black/70 border-border/40 rounded-lg w-10 h-10 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
      aria-label="Open GitBook"
    >
      <BookOpen className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  )
}

export function CheatGlobalButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => window.open("https://cheatglobal.com/", "_blank")}
      className="bg-black/50 hover:bg-black/70 border-border/40 rounded-lg w-10 h-10 flex items-center justify-center text-green-400 hover:text-green-300 transition-colors font-bold"
      aria-label="Open CheatGlobal"
    >
      <span className="text-xs font-bold">CG</span>
    </Button>
  )
}

export function DiscordButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => window.open("https://discord.gg/yourserver", "_blank")}
      className="bg-black/50 hover:bg-black/70 border-border/40 rounded-lg w-10 h-10 flex items-center justify-center text-white"
      aria-label="Join Discord server"
    >
      <FaDiscord className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  )
}
