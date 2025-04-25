import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { resetPassword } from "@/actions/reset-password-action"

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const resetPasswordWithToken = resetPassword.bind(null, token)
  const [state, dispatch] = useActionState(resetPasswordWithToken, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error))
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/login")
        },
        onClick: () => {
          router.push("/login")
        },
      })
    }
  }, [state, router])

  return (
    <form className="space-y-6" noValidate action={dispatch}>
      <div className="space-y-4">
        {[
          { id: "password", label: "NUEVA_CONTRASEÑA", type: "password" },
          {
            id: "password_confirmation",
            label: "CONFIRMAR_CONTRASEÑA",
            type: "password",
          },
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="font-mono text-sm text-primary/80 blink">
              [{field.label}]
            </label>
            <input
              {...field}
              placeholder="••••••••"
              className="w-full p-3 bg-surface/20 border-2 border-accent/30 
                       focus:border-primary outline-none font-mono 
                       placeholder:text-gray-500 focus:shadow-neon"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="retro-button w-full text-primary font-mono hover:bg-surface/50"
      >
        GUARDAR_CLAVE
      </button>

      {state?.errors?.length > 0 && (
        <div className="animate-glitch text-red-500 text-xs font-mono text-center">
          ! ERROR_ACTUALIZACIÓN
        </div>
      )}
    </form>
  )
}
