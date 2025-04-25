"use client"

import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ErrorMessage from "../ui/ErrorMessage"
import BudgetForm from "./BudgetForm"
import { Budget } from "@/src/schemas"
import { editBudget } from "@/actions/edit-budget-action"

export default function EditBudgetForm({ budget }: { budget: Budget }) {
  const router = useRouter()
  const editBudgetWithId = editBudget.bind(null, budget.id)
  const [state, dispatch] = useActionState(editBudgetWithId, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      router.push("/admin")
    }
  }, [state, router])

  return (
    <form className="space-y-6" noValidate action={dispatch}>
      {/* Mensajes de error */}
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      <BudgetForm budget={budget} />

      <button
        type="submit"
        className="retro-button w-full text-accent hover:text-primary"
      >
        ACTUALIZAR_REGISTRO
      </button>
    </form>
  )
}
