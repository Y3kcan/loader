"use client"

import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle, DiscordButton, MusicButton, GitBookButton, CheatGlobalButton } from "@/components/theme-toggle"
import { AuthorCredit } from "@/components/author-credit"

export default function Page() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/valorant-bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <AuthorCredit />
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <MusicButton />
        <GitBookButton />
        <CheatGlobalButton />
        <DiscordButton />
        <ThemeToggle />
      </div>
      {/* MenuBar artık tam ortada */}
      <MenuBar />
    </div>
  )
}
