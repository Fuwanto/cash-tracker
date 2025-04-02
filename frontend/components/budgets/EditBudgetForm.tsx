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
  }, [state])
  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      <BudgetForm budget={budget} />

      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Guardar Cambios"
      />
    </form>
  )
}
