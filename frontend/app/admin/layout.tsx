import ToastNotification from "@/components/ui/ToastNotification"
import getToken from "@/src/auth/token"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = await getToken()
  if (!token) {
    redirect("/auth/login")
  }
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <div className="cyber-box-enhanced p-4 sm:p-6 md:p-8 space-y-8">
        {children}
      </div>

      <ToastNotification />
    </div>
  )
}
