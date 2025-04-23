"use client"
import { Fragment } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import AddExpenseForm from "../expenses/AddExpenseForm"
import EditExpenseForm from "../expenses/EditExpenseForm"
import DeleteExpenseForm from "../expenses/DeleteExpenseForm"

const componentsMap = {
  AddExpense: AddExpenseForm,
  EditExpense: EditExpenseForm,
  DeleteExpense: DeleteExpenseForm,
}

export default function ModalContainer() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const showModal = searchParams.get("showModal")

  const show = showModal ? true : false

  const addExpense = searchParams.get("addExpense")
  const editExpense = searchParams.get("editExpenseId")
  const deleteExpense = searchParams.get("deleteExpenseId")

  const getComponentName = () => {
    if (addExpense) return "AddExpense"
    if (editExpense) return "EditExpense"
    if (deleteExpense) return "DeleteExpense"
  }

  const componentName = getComponentName()

  const ComponentToRender = componentName ? componentsMap[componentName] : null

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())
    Array.from(hideModal.entries()).forEach(([key]) => {
      hideModal.delete(key)
    })
    router.replace(`${pathname}?${hideModal}`)
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
              <DialogPanel className="cyber-box-enhanced w-full max-w-2xl transform space-y-8 p-8 text-center align-middle shadow-neon-xl transition-all">
                {ComponentToRender && (
                  <ComponentToRender closeModal={closeModal} />
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
