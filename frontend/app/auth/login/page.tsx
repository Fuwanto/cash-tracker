import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/auth/LoginForm"

export const metadata: Metadata = {
  title: "CashTracker - Iniciar Sesión",
  description:
    "Inicia sesión en CashTracker para gestionar y controlar tus finanzas de manera eficiente.",
}

export default function LoginPage() {
  return (
    <div className="cyber-box p-8 space-y-8 bg-surface/90 backdrop-blur-sm">
      {/* Encabezado */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text">
          CASH<span className="text-primary">TRACKR</span>
        </h1>
        <div className="font-mono space-y-2">
          <p className="text-lg tracking-widest">F U W A C A S H _ O S</p>
          <p className="text-sm text-gray-400">
            v2.2.5 | Secure Financial Protocol
          </p>
        </div>
      </div>

      {/* Divisor */}
      <div className="h-[2px] bg-accent/30 animate-pulse" />

      {/* Contenido */}
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="font-mono text-xl blink">{">"} TERMINAL DE ACCESO_</h2>
          <p className="text-gray-400 text-sm font-mono">
            Autenticación requerida
          </p>
        </div>

        <LoginForm />

        {/* Enlaces */}
        <nav className="flex flex-col gap-4 font-mono text-sm">
          <Link
            href="/auth/register"
            className="text-accent hover:text-primary transition-colors"
          >
            [ ¿Nuevo usuario? Crear cuenta ]
          </Link>
          <Link
            href="/auth/forgot-password"
            className="text-accent/80 hover:text-primary transition-colors"
          >
            Protocolo de recuperación de contraseña
          </Link>
        </nav>
      </div>
    </div>
  )
}
