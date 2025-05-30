"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes" // Corrected import for type

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    // Pass all props, including forcedTheme, to NextThemesProvider
    <NextThemesProvider {...props}>{children}</NextThemesProvider>
  )
}
