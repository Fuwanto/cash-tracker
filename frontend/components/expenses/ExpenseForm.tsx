import { DraftExpense } from "@/src/schemas"

type ExpenseFormProps = {
  expense?: DraftExpense
}

export default function ExpenseForm({ expense }: ExpenseFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="font-mono text-sm text-primary/80 blink tracking-widest">
          [NOMBRE_GASTO]
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="GASTO_ENERGÍA_Q2"
          className="w-full p-3 bg-surface/20 border-2 border-accent/30 focus:border-primary 
           outline-none font-mono placeholder:text-secondary/50 focus:shadow-neon text-center"
          defaultValue={expense?.name}
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-sm text-primary/80 blink tracking-widest">
          [MONTO_GASTO]
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="000000.00"
          className="w-full p-3 bg-surface/20 border-2 border-accent/30 focus:border-primary 
           outline-none font-mono placeholder:text-secondary/50 focus:shadow-neon text-center"
          defaultValue={expense?.amount}
        />
      </div>
    </div>
  )
}
