import { useParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import ExpenseForm from "./ExpenseForm"
import createExpense from "@/actions/create-expense-action"
import ErrorMessage from "../ui/ErrorMessage"

export default function AddExpenseForm({
  closeModal,
}: {
  closeModal: () => void
}) {
  const { id } = useParams()
  const createExpenseWithBudgetId = createExpense.bind(null, +id!)
  const [state, dispatch] = useActionState(createExpenseWithBudgetId, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state])

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="text-center space-y-4 border-b border-accent/30 pb-6">
        <h3 className="text-2xl md:text-3xl font-mono neon-text tracking-widest">
          [ NUEVO_GASTO ]
        </h3>
        <p className="text-sm md:text-base text-secondary/80 font-mono">
          Protocolo de registro | <span className="text-accent">v2.2.5</span>
        </p>
      </div>

      {/* Mensajes de error */}
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      {/* Formulario */}
      <form
        className="cyber-box-enhanced p-4 md:p-8 space-y-6"
        noValidate
        action={dispatch}
      >
        <ExpenseForm />

        {/* Botones de acción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="submit"
            className="retro-button text-accent hover:text-primary"
          >
            REGISTRAR_GASTO
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
