"use client"

import { useActionState, useEffect, useRef } from "react"
import { updateUser } from "@/actions/update-user-action"
import { toast } from "react-toastify"
import { User } from "@/src/schemas"
import ErrorMessage from "../ui/ErrorMessage"

export default function ProfileForm({ user }: { user: User }) {
  const ref = useRef<HTMLFormElement>(null)

  const [state, dispatch] = useActionState(updateUser, {
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
      className="space-y-6 max-w-md mx-auto sm:max-w-lg lg:max-w-xl"
      noValidate
      action={dispatch}
      ref={ref}
    >
      {/* Mensajes de error */}
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      {/* Campos del formulario */}
      <div className="space-y-4">
        {[
          {
            id: "name",
            label: "NOMBRE",
            type: "text",
            placeholder: "USER_NAME",
          },
          {
            id: "email",
            label: "EMAIL",
            type: "email",
            placeholder: "user@domain.io",
          },
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="font-mono text-sm text-primary/80 blink">
              [{field.label}]
            </label>
            <input
              {...field}
              className="cyber-input w-full"
              defaultValue={user[field.id as keyof User]}
            />
          </div>
        ))}
      </div>

      {/* Botón de submit */}
      <button
        type="submit"
        className="retro-button w-full text-accent hover:text-primary"
      >
        GUARDAR_CAMBIOS
      </button>
    </form>
  )
}
