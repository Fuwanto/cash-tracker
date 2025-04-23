export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="animate-glitch text-red-500 text-xs font-mono pt-2">
      ! {children}
    </div>
  )
}
