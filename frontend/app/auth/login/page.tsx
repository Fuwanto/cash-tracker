import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/auth/LoginForm"

export const metaData: Metadata = {
  title: "CashTracker - Iniciar Sesión",
  description:
    "Inicia sesión en CashTracker para gestionar y controlar tus finanzas de manera eficiente.",
}

export default function LoginPage() {
  return (
    <>
      <h1>Iniciar Sesión</h1>
      <p>y controla tus finanzas</p>
      <LoginForm />

      <nav>
        <Link href="/auth/register">¿No tienes cuenta? Crea una</Link>
        <Link href="/auth/forgot-password">
          ¿Olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  )
}
