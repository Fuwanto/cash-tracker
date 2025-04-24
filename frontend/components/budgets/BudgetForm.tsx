import { Budget } from "@/src/schemas"

export default function BudgetForm({ budget }: { budget?: Budget }) {
  return (
    <div className="space-y-6">
      {/* Campo Nombre */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="font-mono text-sm text-primary/80 blink tracking-widest"
        >
          [NOMBRE_PRESUPUESTO]
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Presupuesto_Q2_2024"
          className="w-full p-3 bg-surface/20 border-2 border-accent/30 rounded-sm
           font-mono placeholder:text-secondary/50
           focus:border-primary focus:shadow-neon
           focus:outline-none transition-glow
           sm:p-2 sm:text-sm"
          defaultValue={budget?.name}
        />
      </div>

      {/* Campo Monto */}
      <div className="space-y-2">
        <label
          htmlFor="amount"
          className="font-mono text-sm text-primary/80 blink tracking-widest"
        >
          [MONTO_INICIAL]
        </label>
        <input
          id="amount"
          type="number"
          name="amount"
          placeholder="000000.00"
          className="w-full p-3 bg-surface/20 border-2 border-accent/30 rounded-sm
           font-mono placeholder:text-secondary/50
           focus:border-primary focus:shadow-neon
           focus:outline-none transition-glow
           sm:p-2 sm:text-sm"
          defaultValue={budget?.amount}
        />
      </div>
    </div>
  )
}
