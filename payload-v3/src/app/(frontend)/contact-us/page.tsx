'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ContactValidator, TContactValidator } from '@/validators/contact-form-validator'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { contact } from '@/server/actions.server'

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting: isLoading },
  } = useForm<TContactValidator>({
    resolver: zodResolver(ContactValidator),
  })

  const onSubmit = async (data: TContactValidator) => {
    const { message } = await contact(data)
    if (message) {
      toast.error(message)
      return
    }
    toast.success('We have recieved your query and will get back to you ASAP')
    reset()
  }

  return (
    <>
      <div className="container relative flex pt-10 flex-col items-center justify-center mb-8 lg:px-0">
        <div className="absolute left-10 top-2">
          <Link
            href={'/'}
            className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center gap-2')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">Submit your Queries</h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="title">Subject</Label>
                  <Input
                    {...register('title')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.title,
                    })}
                    placeholder="Payment Failed"
                  />
                  {errors?.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className="grid gap-2 py-2">
                  <Label htmlFor="description">Your Concern</Label>
                  <div className="relative">
                    <Textarea
                      {...register('description')}
                      className={cn({
                        'focus-visible:ring-red-500': errors.description,
                      })}
                    />

                    {errors?.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>
                </div>

                <Button disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
