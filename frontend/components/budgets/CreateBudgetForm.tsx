"use client"

import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { createBudget } from "@/actions/create-budget-action"
import ErrorMessage from "../ui/ErrorMessage"
import BudgetForm from "./BudgetForm"

export default function CreateBudgetForm() {
  const router = useRouter()
  const [state, dispatch] = useActionState(createBudget, {
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

      <BudgetForm />

      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Crear Presupuesto"
      />
    </form>
  )
}
