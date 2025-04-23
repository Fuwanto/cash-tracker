import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "CashTracker",
  description: "Next-gen financial interface with retro-futuristic aesthetics",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden antialiased cyber-border">
        <main className="container mx-auto px-4 sm:px-6">{children}</main>
      </body>
    </html>
  )
}
