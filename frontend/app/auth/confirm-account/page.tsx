import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm"

export default function ConfirmAccountPage() {
  return (
    <>
      <h1>Confirma tu cuenta</h1>
      <p>
        Ingresa el codigo que recibiste <span>por email</span>
      </p>

      <ConfirmAccountForm />
    </>
  )
}
