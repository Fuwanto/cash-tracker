import { z } from "zod"

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El Email es obligatorio" })
      .email({ message: "Email no válido" }),
    name: z.string().min(1, { message: "El nombre es obligatorio" }),
    password: z
      .string()
      .min(8, { message: "El password es mi corto, mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los passwords no son iguales",
    path: ["password_confirmation"],
  })

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "El Password no puede ir vació" }),
})

export const TokenSchema = z
  .string({ message: "Token no válido" })
  .length(6, { message: "Token no válido" })

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
})

export const SuccessSchema = z.string()

export const ErrorResponseSchema = z.object({
  error: z.string(),
})

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
})

export type User = z.infer<typeof UserSchema>
