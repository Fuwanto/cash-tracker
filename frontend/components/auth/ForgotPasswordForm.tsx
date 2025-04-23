"use client"

import { forgotPassword } from "@/actions/forgot-password-action"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"

export default function ForgotPasswordForm() {
  const [state, dispatch] = useActionState(forgotPassword, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
    }
  })

  return (
    <form className="space-y-6" noValidate action={dispatch}>
      <div className="space-y-4">
        <label className="font-mono text-sm text-primary/80 blink">
          [EMAIL_REGISTRADO]
        </label>
        <input
          type="email"
          placeholder="user@fuwacash.io"
          className="w-full p-3 bg-surface/20 border-2 border-accent/30 
                   focus:border-primary outline-none font-mono 
                   placeholder:text-gray-500 focus:shadow-neon"
          name="email"
        />
      </div>

      <button
        type="submit"
        className="retro-button w-full text-primary font-mono hover:bg-surface/50 cursor-pointer"
      >
        ENVIAR_INSTRUCCIONES
      </button>

      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
    </form>
  )
}
