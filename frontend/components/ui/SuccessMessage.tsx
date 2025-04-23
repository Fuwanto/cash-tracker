export default function SuccessMessage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="neon-text text-green-500 text-xs font-mono">
      ✓ {children}
    </div>
  )
}
