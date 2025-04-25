import { useActionState, useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import ExpenseForm from "./ExpenseForm"
import { DraftExpense } from "@/src/schemas"
import editExpense from "@/actions/edit-expense-action"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void
}) {
  const [expense, setExpense] = useState<DraftExpense>()
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get("editExpenseId")

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: +budgetId!,
    expenseId: +expenseId!,
  })
  const [state, dispatch] = useActionState(editExpenseWithBudgetId, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/budgets/${budgetId}/expenses/${expenseId}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExpense(data))
  }, [budgetId, expenseId])

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state, closeModal])

  return (
    <div className="space-y-8 px-4 sm:px-8">
      <div className="text-center space-y-4 border-b border-accent/30 pb-6">
        <h3 className="text-xl sm:text-2xl font-mono neon-text tracking-widest">
          [ EDITAR_GASTO ]
        </h3>
        <p className="text-secondary/80 font-mono text-sm sm:text-base">
          Protocolo de modificación |{" "}
          <span className="text-accent">v2.2.5</span>
        </p>
      </div>

      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      <form
        className="cyber-box-enhanced p-6 sm:p-8 space-y-6"
        noValidate
        action={dispatch}
      >
        <ExpenseForm expense={expense} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="submit"
            className="retro-button text-accent hover:text-primary text-sm"
          >
            ACTUALIZAR_REGISTRO
          </button>
          <button
            type="button"
            className="retro-button text-secondary hover:text-primary text-sm"
            onClick={closeModal}
          >
            CANCELAR_OPERACIÓN
          </button>
        </div>
      </form>
    </div>
  )
}
