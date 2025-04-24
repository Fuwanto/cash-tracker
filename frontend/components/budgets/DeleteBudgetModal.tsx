"use client"

import { Fragment } from "react"
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ConfirmPasswordForm from "./ConfirmPasswordForm"

export default function DeleteBudgetModal() {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const deleteBudgetId = searchParams.get("deleteBudgetId")
  const show = deleteBudgetId ? true : false

  const hideModal = new URLSearchParams(searchParams.toString())
  hideModal.delete("deleteBudgetId")

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => router.replace(`${pathname}?${hideModal}`)}
      >
        {/* Fondo oscuro con efecto de neón */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-surface/95 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="cyber-box-enhanced w-full max-w-lg sm:max-w-xl md:max-w-2xl transform space-y-8 p-6 sm:p-8 text-center align-middle shadow-neon-xl transition-all">
                {/* Encabezado del modal */}
                <div className="space-y-4 border-b border-accent/30 pb-6">
                  <h3 className="text-xl sm:text-2xl font-mono neon-text text-glitch">
                    ! ADVERTENCIA_CRÍTICA !
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary/80 font-mono">
                    Esta acción no puede ser revertida
                  </p>
                </div>

                {/* Contenido principal */}
                <div className="space-y-6">
                  <p className="font-mono text-base sm:text-lg text-primary/80">
                    Confirmar eliminación del registro:
                  </p>
                  <ConfirmPasswordForm />
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <button
                    type="button"
                    className="retro-button text-xs sm:text-sm px-4 sm:px-6 py-2 hover:bg-surface/50"
                    onClick={() => router.replace(`${pathname}?${hideModal}`)}
                  >
                    [ CANCELAR ]
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
