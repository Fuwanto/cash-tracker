"use client"

import { useRouter } from "next/navigation"

export default function AddExpenseButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      className="retro-button px-6 py-2 text-accent hover:text-primary"
      onClick={() =>
        router.push(location.pathname + "?addExpense=true&showModal=true")
      }
    >
      + NUEVO_GASTO
    </button>
  )
}
