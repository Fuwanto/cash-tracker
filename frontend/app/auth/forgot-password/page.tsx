import type { Metadata } from "next"
import Link from "next/link"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"

export const metaData: Metadata = {
  title: "CashTracker - Olvidé mi Contraseña",
  description: "Restablece tu contraseña para CashTracker",
}

export default function ForgotPasswordPage() {
  return (
    <div className="cyber-box p-8 space-y-8 bg-surface/90 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text">
          RECUPERACIÓN<span className="text-primary">_OS</span>
        </h1>
        <p className="font-mono text-gray-400">
          Ingresa tu dirección de correo para restablecer la contraseña
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="h-[2px] bg-accent/30 animate-pulse" />

      <nav className="flex flex-col gap-4 text-center font-mono text-sm">
        <Link
          href="/auth/register"
          className="text-accent hover:text-primary transition-colors"
        >
          [ ¿No tienes cuenta? Crea una ]
        </Link>
        <Link
          href="/auth/login"
          className="text-accent hover:text-primary transition-colors"
        >
          [ ¿Ya tienes cuenta? Iniciar Sesión ]
        </Link>
      </nav>
    </div>
  )
}
