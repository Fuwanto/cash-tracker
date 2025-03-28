import ToastNotification from "@/components/ui/ToastNotification"
import Logo from "@/components/ui/Logo"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="flex justify-center bg-purple-950 lg:bg-[url(/grafico.svg)] bg-no-repeat bg-left-bottom bg-[auto_500px] ">
          <div className="w-96 py-10 lg:py-20">
            <Logo />
          </div>
        </div>
        <div className="p-10 lg:py-28">
          <div className="max-w-3xl mx-auto"></div>
          {children}
        </div>
      </div>

      <ToastNotification />
    </>
  )
}
