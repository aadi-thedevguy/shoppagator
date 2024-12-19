'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/validators/account-credentials-validator'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signUp } from '@/server/auth.server'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async ({ name, email, password }: TAuthCredentialsValidator) => {
    const { success, message, sentToEmail, errors } = await signUp({ name, email, password })

    if (!success && message) {
      toast.error(message)
      return
    }
    if (!success && errors) {
      for (const key in errors) {
        // @ts-ignore
        setError(key, { message: errors[key] })
      }
    }
    if (success && sentToEmail) {
      toast.success(`Verification email sent to ${sentToEmail}.`)
      router.push('/verify-email?to=' + sentToEmail)
      return
    }
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center mb-8 lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href="/sign-in"
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    {...register('name')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.name,
                    })}
                    placeholder="John Doe"
                  />
                  {errors?.email && <p className="text-sm text-red-500">{errors?.name?.message}</p>}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
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
                  </div>
                  {errors?.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <Button disabled={isLoading}>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
