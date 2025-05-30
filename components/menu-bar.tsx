"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, ShieldOff, Search } from "lucide-react"
import { useTheme } from "next-themes"

interface MenuItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
  gradient: string
  iconColor: string
  fillColor: string
  solidColor: string
}

interface MenuBarProps {
  onApplySpoof: () => void
  onApplySpoofV2: () => void
  onClearSpoof: () => void
  onCheckSpoof: () => void
}

export function MenuBar({ onApplySpoof, onApplySpoofV2, onClearSpoof, onCheckSpoof }: MenuBarProps) {
  const { theme } = useTheme()
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const menuItems: MenuItem[] = [
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Apply Spoof",
      onClick: onApplySpoof,
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
      fillColor: "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.2) 100%)",
      solidColor: "#3b82f6",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Apply Spoof v2",
      onClick: onApplySpoofV2,
      gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(107,33,168,0) 100%)",
      iconColor: "text-purple-500",
      fillColor: "linear-gradient(135deg, rgba(147,51,234,0.4) 0%, rgba(126,34,206,0.2) 100%)",
      solidColor: "#9333ea",
    },
    {
      icon: <ShieldOff className="h-5 w-5" />,
      label: "Clear Spoof",
      onClick: onClearSpoof,
      gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
      iconColor: "text-red-500",
      fillColor: "linear-gradient(135deg, rgba(239,68,68,0.4) 0%, rgba(220,38,38,0.2) 100%)",
      solidColor: "#ef4444",
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: "Check Spoof",
      onClick: onCheckSpoof,
      gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
      iconColor: "text-violet-500",
      fillColor: "linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(147,51,234,0.2) 100%)",
      solidColor: "#a855f7",
    },
  ]

  const itemVariants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
  }

  const backVariants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
  }

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 2,
      transition: {
        opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
      },
    },
  }

  const sharedTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.5,
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined
    const duration = 4000
    const frameRate = 60
    const totalFrames = (duration / 1000) * frameRate
    const incrementPerFrame = 100 / totalFrames

    if (isProcessing) {
      setProgress(0)
      intervalId = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + incrementPerFrame
          if (newProgress >= 100) {
            if (intervalId) clearInterval(intervalId)
            setIsProcessing(false)
            return 100
          }
          return newProgress
        })
      }, 1000 / frameRate)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isProcessing])

  useEffect(() => {
    if (!isProcessing && progress === 100 && selectedItem !== null) {
      const timer = setTimeout(() => {
        setSelectedItem(null)
        setProgress(0)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isProcessing, progress, selectedItem])

  const handleItemClick = (index: number, action: () => void) => {
    setSelectedItem(index)
    setProgress(0)
    setIsProcessing(true)
    action()
  }

  if (!isProcessing && (selectedItem === null || progress !== 100)) {
    return (
      <motion.nav
        className="p-2 rounded-2xl backdrop-blur-lg border border-border/40 shadow-lg relative"
        initial="initial"
        whileHover="hover"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background))/80, hsl(var(--background))/40)",
        }}
      >
        <ul className="flex items-center gap-2 relative">
          {menuItems.map((item, index) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative z-10"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                />
                <motion.button
                  onClick={() => handleItemClick(index, item.onClick)}
                  className="flex items-center justify-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl cursor-pointer border-none text-muted-foreground group-hover:text-foreground"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                >
                  <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.button>
                <motion.button
                  onClick={() => handleItemClick(index, item.onClick)}
                  className="flex items-center justify-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl cursor-pointer border-none text-muted-foreground group-hover:text-foreground"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                >
                  <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-foreground`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.button>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    )
  }

  return (
    <motion.div
      className="p-2 rounded-2xl backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, hsl(var(--background))/80, hsl(var(--background))/40)",
        width: "fit-content",
        minWidth: "400px",
      }}
    >
      <div className="relative h-[44px] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-xl"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: "linear" }}
          style={{
            backgroundColor: selectedItem !== null ? menuItems[selectedItem].solidColor : "transparent",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 text-foreground font-medium">
            {isProcessing ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Loading {Math.round(progress)}%</span>
              </>
            ) : progress === 100 ? (
              <span>Complete</span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
