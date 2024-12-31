'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/validators/account-credentials-validator'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { signIn } from '@/server/auth.server'
import { Skeleton } from '@/components/ui/skeleton'

const SignInForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const origin = searchParams.get('origin')

  // if came from write a review route
  const review = searchParams.get('review')
  const productId = searchParams.get('product')
  const isReview = productId && review === 'true'

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
    const { success, message, errors } = await signIn({ email, password })

    if (!success && message) {
      toast.error(message)
      return
    }

    if (!success && errors) {
      for (const key in errors) {
        // @ts-ignore
        setError(key, { message: errors[key] })
      }
      return
    }

    toast.success(message)
    router.refresh()

    if (isReview) {
      return router.push(`/write-review/${productId}`)
    }

    if (origin) {
      router.push(`/${origin}`)
      return
    }

    router.push('/')
    return
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
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
              {errors?.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Link
            className={cn(
              buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              }),
              'text-blue-400',
            )}
            href="/forgot-password"
          >
            Forgot Password ?
          </Link>

          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </div>
      </form>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Link href="/admin/login" className={buttonVariants({ variant: 'secondary' })}>
        Continue as seller
      </Link>
    </div>
  )
}

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center mb-8 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>

          <Link
            className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5',
            })}
            href="/sign-up"
          >
            Don&apos;t have an account?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Suspense fallback={<SkeletonCard />}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  )
}

export default Page
