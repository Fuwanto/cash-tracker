import Link from "next/link"
import CreateBudgetForm from "@/components/budgets/CreateBudgetForm"

export default function CreateBudgetPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold neon-text">
            NUEVO_<span className="text-primary">PRESUPUESTO</span>
          </h1>
          <p className="font-mono text-secondary/80 text-lg">
            Protocolo de creación | <span className="text-accent">v2.4.1</span>
          </p>
        </div>
        <Link
          href="/admin"
          className="retro-button px-6 py-2 bg-secondary hover:bg-surface/50"
        >
          VOLVER_PANEL
        </Link>
      </div>

      {/* Formulario */}
      <div className="cyber-box-enhanced p-8 bg-surface/90 backdrop-blur-sm">
        <CreateBudgetForm />
      </div>
    </div>
  )
}
