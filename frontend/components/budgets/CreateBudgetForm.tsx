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
    <form className="space-y-6" noValidate action={dispatch}>
      {/* Mensajes de error */}
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}

      <BudgetForm />

      <button
        type="submit"
        className="retro-button w-full text-accent hover:text-primary"
      >
        INICIAR_CREACIÓN
      </button>
    </form>
  )
}
