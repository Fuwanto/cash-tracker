import Link from "next/link"
import CreateBudgetForm from "@/components/budgets/CreateBudgetForm"

export default function CreateBudgetPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center gap-6">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold neon-text">
            NUEVO_<span className="text-primary">PRESUPUESTO</span>
          </h1>
          <p className="font-mono text-secondary/80 text-base sm:text-lg">
            Protocolo de creación | <span className="text-accent">v2.2.5</span>
          </p>
        </div>
        <Link
          href="/admin"
          className="retro-button px-4 sm:px-6 py-2 bg-secondary hover:bg-surface/50 text-sm sm:text-base"
        >
          VOLVER_PANEL
        </Link>
      </div>

      {/* Formulario */}
      <div className="cyber-box-enhanced p-6 sm:p-8 bg-surface/90 backdrop-blur-sm">
        <CreateBudgetForm />
      </div>
    </div>
  )
}
