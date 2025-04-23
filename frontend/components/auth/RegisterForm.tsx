"use client"

import { register } from "@/actions/create-account-action"
import { useActionState, useEffect, useRef } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"

export default function RegisterForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [state, dispatch] = useActionState(register, {
    errors: [],
    success: "",
  }) // useActionState == useFormState (para versiones anteriores)

  useEffect(() => {
    if (state.success) {
      ref.current?.reset()
    }
  }, [state])

  return (
    <form className="space-y-6" noValidate action={dispatch}>
      {/* Mensajes de estado */}
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

      {/* Campos del formulario */}
      <div className="space-y-4">
        {[
          {
            id: "email",
            label: "EMAIL",
            type: "email",
            name: "email",
            placeholder: "user@fuwacash.io",
          },
          {
            id: "name",
            label: "NOMBRE",
            type: "text",
            name: "name",
            placeholder: "John Doe",
          },
          {
            id: "password",
            label: "CONTRASEÑA",
            type: "password",
            name: "password",
            placeholder: "••••••••",
          },
          {
            id: "password_confirmation",
            label: "CONFIRMAR CONTRASEÑA",
            type: "password",
            name: "password_confirmation",
            placeholder: "••••••••",
          },
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <label
              htmlFor={field.id}
              className="font-mono text-sm text-primary/80 blink"
            >
              [{field.label}]
            </label>
            <input
              {...field}
              className="w-full p-3 bg-surface/20 border-2 border-accent/30 focus:border-primary 
                       outline-none font-mono placeholder:text-gray-500 focus:shadow-neon"
              autoComplete="off"
            />
          </div>
        ))}
      </div>

      {/* Botón de Registro */}
      <button
        type="submit"
        className="retro-button w-full text-primary font-mono hover:bg-surface/50"
      >
        CREAR CUENTA
      </button>
    </form>
  )
}
