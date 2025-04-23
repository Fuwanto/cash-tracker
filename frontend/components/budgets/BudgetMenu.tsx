"use client"
import { Fragment } from "react"
import Link from "next/link"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"
import { Budget } from "@/src/schemas"

export default function BudgetMenu({ budgetId }: { budgetId: Budget["id"] }) {
  const router = useRouter()

  return (
    <Menu as="div" className="relative">
      <MenuButton className="text-secondary/80 hover:text-primary transition-glow p-1">
        <span className="sr-only">Opciones</span>
        <EllipsisVerticalIcon className="w-6 h-6 cursor-pointer" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems className="cyber-box-enhanced absolute right-0 z-20 mt-2 w-48 origin-top-right space-y-2 p-2">
          <MenuItem>
            <Link
              href={`/admin/budgets/${budgetId}`}
              className="block px-3 py-2 font-mono text-sm hover:text-primary hover:bg-surface/50 transition-glow rounded-sm"
            >
              [ VER_PRESUPUESTO ]
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href={`/admin/budgets/${budgetId}/edit`}
              className="block px-3 py-2 font-mono text-sm hover:text-primary hover:bg-surface/50 transition-glow rounded-sm"
            >
              [ EDITAR ]
            </Link>
          </MenuItem>

          <MenuItem>
            <button
              type="button"
              className="block w-full px-3 py-2 text-left font-mono text-sm hover:text-glitch hover:bg-surface/50 transition-glow rounded-sm cursor-pointer"
              onClick={() => router.push(`?deleteBudgetId=${budgetId}`)}
            >
              [ ELIMINAR ]
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
