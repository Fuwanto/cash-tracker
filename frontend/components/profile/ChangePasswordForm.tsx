"use client"

import { updatePassword } from "@/actions/update-password-action"
import { useActionState, useEffect, useRef } from "react"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"

export default function ChangePasswordForm() {
  const ref = useRef<HTMLFormElement>(null)

  const [state, dispatch] = useActionState(updatePassword, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      ref.current?.reset()
    }
  }, [state])

  return (
    <form
      className="space-y-6 p-4 sm:p-6 md:p-8 max-w-md mx-auto"
      noValidate
      action={dispatch}
      ref={ref}
    >
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      <div className="space-y-4">
        {[
          { id: "current_password", label: "CLAVE_ACTUAL" },
          { id: "password", label: "NUEVA_CLAVE" },
          { id: "password_confirmation", label: "CONFIRMAR_CLAVE" },
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="font-mono text-sm text-primary/80 blink">
              [{field.label}]
            </label>
            <input
              id={field.id}
              type="password"
              placeholder="••••••••"
              className="cyber-input w-full"
              name={field.id}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="retro-button w-full text-accent hover:text-primary"
      >
        ACTUALIZAR_CLAVE
      </button>
    </form>
  )
}
