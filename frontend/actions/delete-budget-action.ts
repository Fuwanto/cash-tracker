"use server"

import getToken from "@/src/auth/token"
import { revalidateTag } from "next/cache"
import {
  Budget,
  ErrorResponseSchema,
  PasswordValidationSchema,
  SuccessSchema,
} from "@/src/schemas"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function deleteBudget(
  budgetId: Budget["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const currentPassword = PasswordValidationSchema.safeParse(
    formData.get("password")
  )

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: "",
    }
  }

  // chequear password
  const token = await getToken()
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
  const checkPasswordReq = await fetch(checkPasswordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: currentPassword.data,
    }),
  })

  const checkPasswordJson = await checkPasswordReq.json()

  if (!checkPasswordReq.ok) {
    const { error } = ErrorResponseSchema.parse(checkPasswordJson)
    return {
      errors: [error],
      success: "",
    }
  }

  // Eliminar presupuesto
  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
  const deleteBudgetReq = await fetch(deleteBudgetUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const deleteBudgetJson = await deleteBudgetReq.json()

  if (!deleteBudgetReq.ok) {
    const { error } = ErrorResponseSchema.parse(deleteBudgetJson)
    return {
      errors: [error],
      success: "",
    }
  }

  revalidateTag("/all-budgets")

  const success = SuccessSchema.parse(deleteBudgetJson)

  return {
    errors: [],
    success,
  }
}
