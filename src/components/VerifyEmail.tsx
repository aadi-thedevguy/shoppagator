'use client'

import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { verifyEmail } from '@/server/auth.server'
import useSWR from 'swr'

interface VerifyEmailProps {
  token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, error } = useSWR(
    token ? ['verify-email', token] : null,
    async () => await verifyEmail({ token }),
    {
      shouldRetryOnError: false, // Don't retry on failure; tokens are single-use
      revalidateOnFocus: false,
    },
  )

  const isLoading = Boolean(token) && !data && !error

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-sm">This won&apos;t take long.</p>
      </div>
    )
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="relative mb-4 h-60 w-60">
          <Image src="/alligator-email-sent.png" fill alt="Email verified" priority />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground mt-1">Thank you for verifying your email.</p>
        <Link className={buttonVariants({ className: 'mt-4' })} href="/sign-in">
          Sign in
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">Verification link expired</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          This link has already been used or has expired. If you&apos;re already verified, you can
          sign in below.
        </p>
        <Link className={buttonVariants({ variant: 'outline', className: 'mt-4' })} href="/sign-in">
          Go to Sign In
        </Link>
      </div>
    )
  }

  return null
}

export default VerifyEmail
