import ChangePasswordForm from "@/components/profile/ChangePasswordForm"

export default async function ChangePasswordPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="cyber-box-enhanced p-6">
        <h1 className="text-2xl sm:text-3xl font-bold neon-text text-primary mb-4">
          CAMBIAR_CLAVE
        </h1>
        <p className="font-mono text-secondary/80 text-base sm:text-lg">
          Protocolo de seguridad | <span className="text-accent">v2.2.5</span>
        </p>
      </div>

      <div className="cyber-box-enhanced p-6 sm:p-8 bg-surface/90 backdrop-blur-sm">
        <ChangePasswordForm />
      </div>
    </div>
  )
}
