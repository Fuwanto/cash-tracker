import { Metadata } from "next"
import Link from "next/link"
import getToken from "@/src/auth/token"
import { BudgetsAPIResponseSchema } from "@/src/schemas"
import { formatCurrency, formatDate } from "@/src/utils"
import BudgetMenu from "@/components/budgets/BudgetMenu"
import DeleteBudgetModal from "@/components/budgets/DeleteBudgetModal"

export const metadata: Metadata = {
  title: "CashTracker - Panel de Administración",
  description: "Administra tus presupuestos de manera eficiente y organizada.",
}

async function getUserBudgets() {
  const token = await getToken()
  const url = `${process.env.API_URL}/budgets`
  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["all-budgets"],
    },
  })

  const json = await req.json()

  const budgets = BudgetsAPIResponseSchema.parse(json)

  return budgets
}

export default async function AdminPage() {
  const budgets = await getUserBudgets()

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center gap-6">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold neon-text">
            <span className="text-primary">MIS_PRESUPUESTOS</span>
          </h1>
          <p className="font-mono text-secondary/80 text-base sm:text-lg">
            Sistema de gestión financiera |
            <span className="text-accent ml-2">v2.2.5</span>
          </p>
        </div>
        <Link
          href="/admin/budgets/new"
          className="retro-button px-4 sm:px-6 py-1.5 sm:py-2 text-accent hover:text-primary"
        >
          + CREAR_PRESUPUESTO
        </Link>
      </div>

      {/* Listado de presupuestos */}
      {budgets.length ? (
        <div className="cyber-box-enhanced p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          <ul role="list" className="space-y-4">
            {budgets.map((budget) => (
              <li
                key={budget.id}
                className="group cyber-box-inner p-3 sm:p-4 hover:bg-surface/50 transition-glow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-2 flex-1 text-center sm:text-left">
                    <Link
                      href={`/admin/budgets/${budget.id}`}
                      className="font-mono text-base sm:text-lg neon-text hover:text-accent"
                    >
                      {budget.name}
                    </Link>
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      {formatCurrency(+budget.amount)}
                    </p>
                    <p className="font-mono text-xs sm:text-sm text-secondary/60">
                      Última actualización: {formatDate(budget.updatedAt)}
                    </p>
                  </div>
                  <div className="relative self-center sm:self-auto sm:justify-end">
                    <BudgetMenu budgetId={budget.id} />
                  </div>
                </div>
                <DeleteBudgetModal />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        /* Estado vacío */
        <div className="cyber-box-enhanced p-6 sm:p-8 lg:p-10 text-center space-y-4 sm:space-y-6 animate-pulse">
          <p className="font-mono text-secondary/80 text-xs sm:text-sm">
            ! SISTEMA_VACÍO
          </p>
          <Link
            href="/admin/budgets/new"
            className="retro-button inline-block text-accent"
          >
            INICIAR_PROTOCOLO_CREACIÓN
          </Link>
        </div>
      )}
    </div>
  )
}
