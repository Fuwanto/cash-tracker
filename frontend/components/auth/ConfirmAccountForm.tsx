"use client"
import { startTransition, useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { confirmAccount } from "@/actions/confirm-account-action"
import ErrorMessage from "../ui/ErrorMessage"

export default function ConfirmAccountForm() {
  const router = useRouter()
  const [isComplete, setIsComplete] = useState(false)
  const [token, setToken] = useState("")
  const confirmAccountWithToken = confirmAccount.bind(null, token) // para pasar argumentos adicionales a los server actions
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (isComplete) {
      startTransition(() => {
        dispatch()
      })
    }
  }, [isComplete])

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login")
        },
      })
    }
  }, [state, router])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <div className="flex flex-col text-center">
      <div className="space-y-6 flex justify-center">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          {[...Array(6)].map((_, i) => (
            <PinInputField
              key={i}
              className="h-12 w-12 bg-surface/20 border-2 border-accent/30 
                     text-center font-mono text-xl focus:border-primary
                     focus:shadow-neon outline-none rounded-sm blink-caret"
              placeholder="○"
            />
          ))}
        </PinInput>
      </div>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
    </div>
  )
}
