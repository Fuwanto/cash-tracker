import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"
import Logo from "@/components/ui/Logo"
import AdminMenu from "@/components/admin/AdminMenu"
import { verifySession } from "@/src/auth/dal"

export const metadata: Metadata = {
  title: "CashTracker",
  description: "Next-gen financial interface with retro-futuristic aesthetics",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()
  const user = session?.user

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col overflow-x-hidden antialiased cyber-border">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-sm border-b-2 border-accent/30 shadow-neon-bottom py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/"
              className="neon-filter hover:scale-105 transition-transform"
            >
              <Logo />
            </Link>

            {user ? (
              <AdminMenu user={user} />
            ) : (
              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-xl border border-accent text-accent  hover:text-primary transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-xl border border-accent text-accent hover:text-primary transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t-2 border-accent/30 mt-12 py-6 px-4">
          <p className="text-center font-mono text-xs sm:text-sm text-secondary/60 tracking-widest">
            SISTEMA_FUWACASH © {new Date().getFullYear()} | TODOS LOS DERECHOS
            RESERVADOS
          </p>
        </footer>
      </body>
    </html>
  )
}
