import { Metadata } from "next"
import { getBudgetById } from "@/src/services/budget"
import AddExpenseButton from "@/components/expenses/AddExpenseButton"
import ModalContainer from "@/components/ui/ModalContainer"
import { formatCurrency, formatDate } from "@/src/utils"
import ExpenseMenu from "@/components/expenses/ExpenseMenu"
import Amount from "@/components/ui/Amount"
import ProgressBar from "@/components/budgets/ProgressBar"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const budget = await getBudgetById(id)
  return {
    title: `CashTracker - ${budget.name}`,
    description: `CashTracker - ${budget.name}`,
  }
}

export default async function BudgetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const budget = await getBudgetById(id)

  const totalSpent = budget.expenses.reduce(
    (total, expense) => +expense.amount + total,
    0
  )

  const totalAvailable = +budget.amount - totalSpent

  const percentage = +((totalSpent / +budget.amount) * 100).toFixed(2)

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-center cyber-box-enhanced p-6 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold neon-text">
            {budget.name}
          </h1>
          <p className="font-mono text-secondary/80 text-base md:text-lg">
            Sistema de gestión | <span className="text-accent">v2.2.5</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      {/* Panel de estadísticas */}
      <div className="cyber-box-enhanced p-6 md:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <ProgressBar percentage={percentage} />
          <div className="flex flex-col gap-4 font-mono">
            <Amount label="Presupuesto Total" amount={+budget.amount} />
            <Amount label="Disponible" amount={totalAvailable} />
            <Amount label="Gastado" amount={totalSpent} />
          </div>
        </div>

        {/* Listado de gastos */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="neon-text text-lg md:text-xl font-mono blink">
            REGISTRO_DE_GASTOS
          </h2>
          {budget.expenses.length ? (
            <ul className="space-y-4">
              {budget.expenses.map((expense) => (
                <li
                  key={expense.id}
                  className="cyber-box-inner p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-surface/50"
                >
                  <div className="space-y-1 text-center md:text-left">
                    <p className="font-mono text-base md:text-lg neon-text">
                      {expense.name}
                    </p>
                    <p className="text-primary text-xl md:text-2xl">
                      {formatCurrency(+expense.amount)}
                    </p>
                    <p className="text-secondary/60 text-sm font-mono">
                      {formatDate(expense.updatedAt)}
                    </p>
                  </div>
                  <ExpenseMenu expenseId={expense.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-mono text-center text-secondary/80 animate-pulse">
              ! SIN_REGISTROS_ACTIVOS !
            </p>
          )}
        </div>
      </div>

      <ModalContainer />
    </div>
  )
}
