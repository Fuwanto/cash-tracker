"use server"

import { cookies } from "next/headers"
import {
  DraftBudgetSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function createBudget(
  prevState: ActionStateType,
  formData: FormData
) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  })
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    }
  }

  const cookieStore = await cookies()
  const token = cookieStore.get("CASHTRACKER_TOKEN")?.value

  const url = `${process.env.API_URL}/budgets/`
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  })

  const json = await req.json()

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json)
    return {
      errors: [error],
      success: "",
    }
  }

  const success = SuccessSchema.parse(json)

  return {
    errors: [],
    success,
  }
}
