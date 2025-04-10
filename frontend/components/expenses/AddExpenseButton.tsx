"use client"

import { useRouter } from "next/navigation"

export default function AddExpenseButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() =>
        router.push(location.pathname + "?addExpense=true&showModal=true")
      }
    >
      Agregar Gasto
    </button>
  )
}
