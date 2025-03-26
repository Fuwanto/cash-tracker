"use server"

import {
  ErrorResponseSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from "@/src/schemas"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function forgotPassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const forgotPass = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  })

  if (!forgotPass.success) {
    return {
      errors: forgotPass.error.errors.map((issue) => issue.message),
      success: "",
    }
  }

  const url = `${process.env.API_URL}/auth/forgot-password`
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: forgotPass.data.email,
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
