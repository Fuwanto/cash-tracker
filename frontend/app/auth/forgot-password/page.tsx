import type { Metadata } from "next"
import Link from "next/link"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"

export const metaData: Metadata = {
  title: "CashTracker - Olvidé mi Contraseña",
  description: "Restablece tu contraseña para CashTracker",
}

export default function ForgotPasswordPage() {
  return (
    <>
      <h1>¿Olvidaste tu contraseña?</h1>
      <p>
        Por favor, ingresa tu dirección de correo electrónico para restablecer
        tu contraseña.
      </p>
      <ForgotPasswordForm />

      <nav>
        <Link href="/auth/register">¿No tienes cuenta? Crea una</Link>
        <Link href="/auth/login">¿Ya tienes cuenta? Iniciar Sesión</Link>
      </nav>
    </>
  )
}
