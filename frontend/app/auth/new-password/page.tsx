import Link from "next/link"
import PasswordResetHandler from "@/components/auth/PasswordResetHandler"

export default function NewPasswordPage() {
  return (
    <div className="cyber-box p-4 sm:p-8 space-y-8 bg-surface/90 backdrop-blur-sm">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold neon-text">
          RESET<span className="text-primary">_OS</span>
        </h1>
        <p className="font-mono text-gray-400 text-sm sm:text-base">
          Ingresa el código de verificación recibido por{" "}
          <span className="text-accent">email</span>
        </p>
      </div>

      <PasswordResetHandler />

      <div className="h-[2px] bg-accent/30 animate-pulse" />

      <nav className="text-center font-mono text-xs sm:text-sm">
        <Link
          href="/auth/login"
          className="text-accent hover:text-primary transition-colors"
        >
          [ Volver al inicio de sesión ]
        </Link>
      </nav>
    </div>
  )
}
