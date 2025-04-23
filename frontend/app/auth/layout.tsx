import ToastNotification from "@/components/ui/ToastNotification"
import Logo from "@/components/ui/Logo"
import { verifySession } from "@/src/auth/dal"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = await verifySession()
  if (user) {
    redirect("/admin")
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      {/* Columna izquierda */}
      <div className="hidden lg:flex items-center justify-center p-16 bg-gradient-to-br from-surface/95 to-primary/10">
        <div className="cyber-box p-12 space-y-12 text-center">
          <Logo />
          <div className="space-y-4">
            <h2 className="text-5xl font-mono neon-text">FUWACASH_OS</h2>
            <div className="h-[2px] bg-accent/40 w-full animate-pulse" />
            <p className="text-gray-400 text-lg font-mono">
              v2.2.5 | Secure Financial Protocol
            </p>
          </div>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex items-center justify-center p-8 lg:p-20">
        <div className="w-full max-w-md space-y-12">
          {children}
          <p className="text-center text-gray-600 text-xs font-mono">
            © 2025 Fumento Systems
          </p>
        </div>
      </div>
      <ToastNotification />
    </div>
  )
}
