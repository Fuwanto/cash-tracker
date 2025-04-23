import { formatCurrency } from "@/src/utils"

type AmountProps = {
  label: string
  amount: number
}

export default function Amount({ label, amount }: AmountProps) {
  return (
    <div className="flex justify-between items-center cyber-box-inner p-3">
      <span className="font-mono text-primary/80">{label}:</span>
      <span className="neon-text font-bold">{formatCurrency(amount)}</span>
    </div>
  )
}
