import "@/styles/globals.css" // Ensure this is app/globals.css if you renamed it, or styles/globals.css if that's the actual path
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // The 'dark' class will be applied to html, and ThemeProvider will manage it.
    // forcedTheme ensures it stays dark.
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default to dark
          enableSystem={false} // Disable system preference
          forcedTheme="dark" // Force dark theme
          disableTransitionOnChange // Optional: disable transitions on theme change if any were present
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
