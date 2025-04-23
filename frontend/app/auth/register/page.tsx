import type { Metadata } from "next"
import Link from "next/link"
import RegisterForm from "@/components/auth/RegisterForm"

export const metaData: Metadata = {
  title: "CashTracker - Crear Cuenta",
  description:
    "Regístrate en CashTracker para empezar a gestionar y controlar tus finanzas de manera eficiente.",
}

export default function RegisterPage() {
  return (
    <div className="cyber-box p-8 space-y-8 bg-surface/90 backdrop-blur-sm">
      {/* Encabezado */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text">
          CASH<span className="text-primary">TRACKR</span>
        </h1>
        <div className="font-mono space-y-2">
          <p className="text-lg tracking-widest">NUEVA CUENTA_OS</p>
          <p className="text-sm text-gray-400">
            v2.2.5 | Secure Registration Protocol
          </p>
        </div>
      </div>

      {/* Divisor */}
      <div className="h-[2px] bg-accent/30 animate-pulse" />

      {/* Contenido */}
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="font-mono text-xl blink">
            {">"} REGISTRO DE USUARIO_
          </h2>
          <p className="text-gray-400 text-sm font-mono">
            Credenciales requeridas
          </p>
        </div>

        <RegisterForm />

        {/* Enlace */}
        <nav className="font-mono text-sm text-center">
          <Link
            href="/auth/login"
            className="text-accent hover:text-primary transition-colors"
          >
            [ ¿Ya tienes cuenta? Iniciar Sesión ]
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-600 text-xs font-mono mt-8">
        © 2025 Fumento Systems | Todos los derechos reservados
      </p>
    </div>
  )
}
