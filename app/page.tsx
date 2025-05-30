// --- page.tsx ---
"use client"

import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle, DiscordButton, MusicButton, GitBookButton, CheatGlobalButton } from "@/components/theme-toggle"
import { AuthorCredit } from "@/components/author-credit"

export default function Page() {
  const applySpoof = () => {
    fetch("http://localhost:6969/apply", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Apply Spoof]:", data))
      .catch(err => console.error("[Apply Spoof Error]:", err));
  };

  const applySpoofV2 = () => {
    fetch("http://localhost:6969/applyv2", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Apply Spoof v2]:", data))
      .catch(err => console.error("[Apply Spoof v2 Error]:", err));
  };

  const clearSpoof = () => {
    fetch("http://localhost:6969/clear", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Clear Spoof]:", data))
      .catch(err => console.error("[Clear Spoof Error]:", err));
  };

  const checkSpoof = () => {
    fetch("http://localhost:6969/check", { method: "POST" })
      .then(res => res.text())
      .then(data => console.log("[Check Spoof]:", data))
      .catch(err => console.error("[Check Spoof Error]:", err));
  };

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

      <MenuBar
        onApplySpoof={applySpoof}
        onApplySpoofV2={applySpoofV2}
        onClearSpoof={clearSpoof}
        onCheckSpoof={checkSpoof}
      />
    </div>
  )
}
