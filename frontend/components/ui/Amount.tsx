import { formatCurrency } from "@/src/utils"

type AmountProps = {
  label: string
  amount: number
}

export default function Amount({ label, amount }: AmountProps) {
  return (
    <p>
      {label}: {""}
      <span>{formatCurrency(amount)}</span>
    </p>
  )
}
