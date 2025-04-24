import { useParams, useSearchParams } from "next/navigation"
import { startTransition, useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import deleteExpense from "@/actions/delete-expense-action"
import ErrorMessage from "../ui/ErrorMessage"

type DeleteExpenseForm = {
  closeModal: () => void
}

export default function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get("deleteExpenseId")!

  const deleteExpenseWithBudgetId = deleteExpense.bind(null, {
    budgetId: +budgetId!,
    expenseId: +expenseId,
  })
  const [state, dispatch] = useActionState(deleteExpenseWithBudgetId, {
    errors: [],
    success: "",
  })

  const handleDeleteClick = () => {
    startTransition(() => {
      dispatch()
    })
  }

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state])

  useEffect(() => {
    if (!Number.isInteger(+budgetId!) || !Number.isInteger(+expenseId)) {
      closeModal()
    }
  }, [])

  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8">
      <div className="text-center space-y-4 border-b border-accent/30 pb-6">
        <h3 className="text-xl sm:text-2xl font-mono neon-text text-glitch tracking-widest">
          ! ELIMINAR_GASTO !
        </h3>
        <p className="text-sm sm:text-base text-secondary/80 font-mono">
          Acción permanente |{" "}
          <span className="text-glitch">No recuperable</span>
        </p>
      </div>

      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          className="retro-button text-secondary hover:text-primary w-full text-xs sm:text-sm"
          onClick={closeModal}
        >
          [ ABORTAR ]
        </button>
        <button
          type="button"
          className="retro-button bg-glitch/80 hover:bg-glitch text-white w-full text-xs sm:text-sm"
          onClick={handleDeleteClick}
        >
          [ CONFIRMAR_ELIMINACIÓN ]
        </button>
      </div>
    </div>
  )
}
