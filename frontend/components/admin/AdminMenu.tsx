"use client"

import { Fragment } from "react"
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { User } from "@/src/schemas"
import { logout } from "@/actions/logout-user-action"

export default function AdminMenu({ user }: { user: User }) {
  return (
    <Popover className="relative">
      <PopoverButton className="group inline-flex items-center gap-x-1 p-1 rounded-sm border-2 border-primary/50 hover:border-accent transition-all">
        <Bars3Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors cursor-pointer" />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <PopoverPanel className="absolute left-1/2 z-30 mt-4 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48 ">
          <div className="cyber-box-enhanced w-full lg:w-64 p-4 space-y-4 font-mono text-sm">
            {/* Encabezado del menú */}
            <div className="text-center border-b border-accent/30 pb-2">
              <p className="neon-text text-primary/80">USUARIO:</p>
              <p className="text-accent truncate">{user.name}</p>
            </div>

            {/* Opciones del menú */}
            <Link
              href="/admin/profile/settings"
              className="block p-2 hover:text-primary hover:bg-surface/50 transition-glow rounded-sm"
            >
              [ MI_PERFIL ]
            </Link>
            <Link
              href="/admin"
              className="block p-2 hover:text-primary hover:bg-surface/50 transition-glow rounded-sm"
            >
              [ MIS_PRESUPUESTOS ]
            </Link>

            {/* Botón de logout */}
            <button
              className="w-full p-2 text-left hover:text-glitch hover:bg-surface/50 transition-glow rounded-sm cursor-pointer"
              type="button"
              onClick={async () => {
                await logout()
              }}
            >
              [ CERRAR_SESIÓN ]
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
