import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { deleteBudget } from "@/actions/delete-budget-action"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"

export default function ConfirmPasswordForm() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const budgetId = +searchParams.get("deleteBudgetId")!

  const deleteBudgetWithPassword = deleteBudget.bind(null, budgetId)
  const [state, dispatch] = useActionState(deleteBudgetWithPassword, {
    errors: [],
    success: "",
  })

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())
    hideModal.delete("deleteBudgetId")
    router.replace(`${pathname}?${hideModal}`)
  }
  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state])

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="text-center space-y-4 border-b border-accent/30 pb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-mono neon-text text-glitch text-center">
          ! ELIMINAR_PRESUPUESTO !
        </h3>
        <p className="text-sm sm:text-base text-secondary/80 font-mono">
          Acción permanente - <span className="text-glitch">No reversible</span>
        </p>
      </div>

      {/* Mensajes de error */}
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      {/* Formulario */}
      <form className="space-y-6" noValidate action={dispatch}>
        <div className="space-y-4">
          <label className="font-mono text-base sm:text-lg text-primary/80 blink">
            [CONFIRMAR_CONTRASEÑA]
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 bg-surface/20 border-2 border-accent/30 focus:border-primary 
           outline-none font-mono placeholder:text-secondary/50 focus:shadow-neon text-center"
            name="password"
          />
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="submit"
            className="retro-button bg-glitch/80 hover:bg-glitch text-white"
          >
            CONFIRMAR_ELIMINACIÓN
          </button>
          <button
            type="button"
            className="retro-button text-secondary hover:text-primary"
            onClick={closeModal}
          >
            CANCELAR_OPERACIÓN
          </button>
        </div>
      </form>
    </div>
  )
}
