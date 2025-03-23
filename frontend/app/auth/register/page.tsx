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
    <>
      <h1>Crea una cuenta</h1>
      <p>y controla tus finanzas</p>
      <RegisterForm />

      <nav>
        <Link href="/auth/login">¿Ya tienes cuenta? Iniciar Sesión</Link>
      </nav>
    </>
  )
}
