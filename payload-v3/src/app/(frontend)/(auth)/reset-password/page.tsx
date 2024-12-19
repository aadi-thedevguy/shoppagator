'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { resetValidator, TResetValidator } from '@/validators/account-credentials-validator'
import { resetPassword } from '@/server/auth.server'
import { useSearchParams,useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Page = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TResetValidator>({
    resolver: zodResolver(resetValidator),
  })

  const onSubmit = async (data: TResetValidator) => {
    const { errors: serverErrors, message, success } = await resetPassword(data)
    if (!success && message) {
      setError('token', { message })
      return
    }
    if (!success && serverErrors) {
      for (const key in serverErrors) {
        // @ts-ignore
        setError(key, { message: serverErrors[key] })
        return
      }
    }
    if (success && message) {
      toast.success(message)
      router.push('/sign-in')
      return
    }
  }

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === 'string' ? (
          <div className="grid gap-6 mb-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <input {...register('token')} value={token} type="hidden" />
                {errors.token && (
                  <p className="text-sm mb-4 text-red-500">{errors.token.message}</p>
                )}
                <div className="grid gap-2 py-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className={cn({
                        'focus-visible:ring-red-500': errors.password,
                      })}
                      placeholder="Password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </div>
                    {errors?.password && (
                      <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2 py-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={cn({
                        'focus-visible:ring-red-500': errors.confirmPassword,
                      })}
                      placeholder="Password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </div>
                    {errors?.confirmPassword && (
                      <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Reset Password
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/alligator-email-sent.png"
                fill
                alt="alligator making a thumbs up gesture for a sent mail"
              />
            </div>
            <h3 className="font-semibold text-2xl">Unable to send email</h3>
            <p className="text-muted-foreground text-center">Try Again Later</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
