"use client"
import { useActionState } from "react"
import { authenticate } from "@/actions/authenticate-user-action"
import ErrorMessage from "../ui/ErrorMessage"

export default function LoginForm() {
  const [state, dispatch] = useActionState(authenticate, {
    errors: [],
  })

  return (
    <form className="space-y-6" noValidate action={dispatch}>
      {/* Campo Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="font-mono text-sm text-primary/80 blink"
        >
          [USER_IDENTIFIER]
        </label>
        <input
          id="email"
          type="email"
          placeholder="user@fuwacash.io"
          className="w-full p-3 bg-surface/20 border-2 border-accent/30 focus:border-primary 
                   outline-none font-mono placeholder:text-gray-500 focus:shadow-neon"
          name="email"
          autoComplete="off"
        />
      </div>

      {/* Campo Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-mono text-sm text-primary/80 blink"
        >
          [ENCRYPTION_KEY]
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full p-3 bg-surface/20 border-2 border-accent/30 focus:border-primary 
                   outline-none font-mono placeholder:text-gray-500 focus:shadow-neon"
          name="password"
          autoComplete="off"
        />
      </div>

      {/* Botón de Submit */}
      <button
        type="submit"
        className="retro-button w-full text-primary font-mono hover:bg-surface/50 cursor-pointer"
      >
        INICIAR SESIÓN
      </button>

      {/* Mensaje de error */}

      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
    </form>
  )
}
