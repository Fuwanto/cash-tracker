import Link from "next/link"
import ToastNotification from "@/components/ui/ToastNotification"
import Logo from "@/components/ui/Logo"
import { verifySession } from "@/src/auth/dal"
import AdminMenu from "@/components/admin/AdminMenu"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = await verifySession()

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header con efecto de terminal */}
      <header className="bg-surface/90 backdrop-blur-sm border-b-2 border-accent/30 shadow-neon-bottom py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-6">
          <Link
            href="/admin"
            className="neon-filter hover:scale-105 transition-transform"
          >
            <Logo />
          </Link>

          <AdminMenu user={user} />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-10">
        <div className="cyber-box-enhanced p-8 space-y-8">{children}</div>
      </main>

      <ToastNotification />

      {/* Footer estilo panel de sistema */}
      <footer className="border-t-2 border-accent/30 mt-12 py-6">
        <p className="text-center font-mono text-sm text-secondary/60 tracking-widest">
          SISTEMA_FUWACASH © {new Date().getFullYear()} | TODOS LOS DERECHOS
          RESERVADOS
        </p>
      </footer>
    </div>
  )
}
