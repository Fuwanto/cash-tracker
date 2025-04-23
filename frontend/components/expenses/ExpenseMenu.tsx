"use client"
import { Fragment } from "react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react"
import { useRouter } from "next/navigation"
import { Expense } from "@/src/schemas"

export default function ExpenseMenu({
  expenseId,
}: {
  expenseId: Expense["id"]
}) {
  const router = useRouter()

  return (
    <Menu as="div" className="relative">
      <MenuButton className="text-secondary/80 hover:text-primary transition-glow p-1">
        <EllipsisVerticalIcon className="w-6 h-6" />
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
            <button
              className="block w-full px-3 py-2 text-left font-mono text-sm hover:text-primary hover:bg-surface/50 transition-glow"
              onClick={() =>
                router.push(`?editExpenseId=${expenseId}&showModal=true`)
              }
            >
              [ EDITAR ]
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="block w-full px-3 py-2 text-left font-mono text-sm hover:text-glitch hover:bg-surface/50 transition-glow"
              onClick={() =>
                router.push(`?deleteExpenseId=${expenseId}&showModal=true`)
              }
            >
              [ ELIMINAR ]
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
