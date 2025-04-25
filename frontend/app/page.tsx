export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 p-4 sm:p-6">
      {/* Encabezado principal */}
      <div className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold neon-text tracking-widest">
          ADMINISTRADOR_DE_GASTOS
        </h1>
        <p className="text-lg sm:text-2xl font-mono text-secondary/80">
          Controla tus <span className="text-primary">finanzas</span>
        </p>
      </div>

      {/* Descripción */}
      <p className="text-base sm:text-lg font-mono text-secondary/80 leading-relaxed text-center max-w-xl sm:max-w-3xl mx-auto">
        {"> "}Domina tus finanzas con nuestro sistema de gestión cuántica.
        Simplifica la administración de recursos en un solo nodo, con interfaz
        holográfica y algoritmos predictivos.
      </p>

      {/* Ventajas */}
      <div className="space-y-8 sm:space-y-10">
        <h2 className="text-2xl sm:text-3xl font-bold neon-text text-center border-b-2 border-accent/30 pb-2 sm:pb-4">
          VENTAJAS_CASHTRACKER
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            {
              title: "ORGANIZACIÓN_OPTIMA",
              content:
                "Clasificación cuántica de transacciones con visualización holográfica 3D",
            },
            {
              title: "PRESUPUESTACIóN_AI",
              content:
                "Algoritmos predictivos para objetivos financieros con 99.7% de precisión",
            },
            {
              title: "ACCESO_MULTIVERSO",
              content:
                "Interfaz disponible en todas las realidades dimensionales",
            },
            {
              title: "SEGURIDAD_QUANTUM",
              content:
                "Encriptación nivel 9 con protección contra amenazas transdimensionales",
            },
          ].map((item, index) => (
            <li
              key={index}
              className="cyber-box-inner p-4 sm:p-6 hover:bg-surface/50 transition-glow"
            >
              <div className="space-y-2 sm:space-y-4">
                <span className="font-mono text-primary text-base sm:text-lg blink">
                  [0{index + 1}]
                </span>
                <h3 className="font-mono text-lg sm:text-xl neon-text">
                  {item.title}
                </h3>
                <p className="font-mono text-secondary/80 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
