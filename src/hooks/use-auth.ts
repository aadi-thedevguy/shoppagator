import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { signOut as signOutAction } from '@/server/auth.server'

export const useAuth = () => {
  const router = useRouter()

  const signOut = async () => {
    try {
      const result = await signOutAction()

      if (!result.success) throw new Error()

      toast.success('Signed out successfully')

      router.push('/sign-in')
      router.refresh()
    } catch (err) {
      toast.error("Couldn't sign out, please try again.")
    }
  }

  return { signOut }
}
