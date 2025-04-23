import Link from "next/link"

export default function NotFound() {
  return (
    <div className="cyber-box p-8 space-y-8 text-center bg-surface/90 backdrop-blur-sm">
      {/* Encabezado con efecto glitch */}
      <div className="space-y-4">
        <h1 className="neon-text text-5xl font-bold animate-glitch">
          ERROR_404
        </h1>
        <p className="font-mono text-xl text-secondary/80">
          Recurso no encontrado en el sistema
          <span className="block text-accent mt-2">[FUWACASH_OS v2.2.5]</span>
        </p>
      </div>

      {/* Mensaje específico */}
      <div className="cyber-border-inner p-6 space-y-4">
        <p className="font-mono text-lg">
          {">"} Presupuesto target:<span className="text-primary blink">_</span>
        </p>
        <p className="text-red-500 font-mono animate-pulse">
          ! NO_EXISTE_EN_LA_MATRIZ
        </p>
      </div>

      {/* Botón de retorno */}
      <Link
        href="/admin"
        className="retro-button inline-block !text-primary hover:!bg-surface/50"
      >
        IR_A_PRESUPUESTOS
      </Link>

      {/* Footer */}
      <p className="text-xs font-mono text-secondary/60 mt-8">
        © 2025 Fuwanto Systems | All rights reserved
      </p>
    </div>
  )
}
