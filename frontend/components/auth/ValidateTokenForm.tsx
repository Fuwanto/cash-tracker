"use client"

import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { validateToken } from "@/actions/validate-token-action"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"

type ValidateTokenFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
}

export default function ValidateTokenForm({
  setIsValidToken,
  token,
  setToken,
}: ValidateTokenFormProps) {
  const [isComplete, setIsComplete] = useState(false)
  const validateTokenInput = validateToken.bind(null, token)
  const [state, dispatch] = useActionState(validateTokenInput, {
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
      toast.success(state.success)
      setIsValidToken(true)
    }
  }, [state])

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
                     focus:shadow-neon outline-none rounded-sm blink-caret
                     placeholder:text-gray-500"
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
