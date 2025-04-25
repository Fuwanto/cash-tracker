import ProfileForm from "@/components/profile/ProfileForm"
import { verifySession } from "@/src/auth/dal"

export default async function EditProfilePage() {
  const session = await verifySession()
  const user = session!.user

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="cyber-box-enhanced p-6">
        <h1 className="text-xl sm:text-2xl font-bold neon-text text-primary">
          ACTUALIZAR_<span className="text-accent">PERFIL</span>
        </h1>
        <p className="font-mono text-secondary/80 text-base sm:text-lg mt-4">
          Protocolo de usuario | <span className="text-accent">v2.2.5</span>
        </p>
      </div>

      <div className="cyber-box-enhanced p-6 sm:p-8 bg-surface/90 backdrop-blur-sm">
        <ProfileForm user={user} />
      </div>
    </div>
  )
}
