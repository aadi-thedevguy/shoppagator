'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, StarIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { User } from '@/payload-types'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { ReviewValidator, TReviewValidator } from '@/validators/review-validator'
import { useMutation } from '@tanstack/react-query'
import { ZodError } from 'zod'
import { createReview } from '@/server/reviews.server'

const ReviewForm = ({ user, product }: { user: User; product: string }) => {
  const starValues = [1, 2, 3, 4, 5]

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TReviewValidator>({
    resolver: zodResolver(ReviewValidator),
  })

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: TReviewValidator) => createReview(data),
    onSuccess: () => {
      toast.success('Thank You for your valuable Review')
      reset()
      redirect('/products')
    },
    onError: (err) => {
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message)
      }
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('Failed to submit review, Try Again later')
      }
    },
  })

  const onSubmit = (data: TReviewValidator) => {
    mutate(data)
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">Share Your Experience</h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-2 py-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  value={user.email}
                  type="email"
                  readOnly
                  className="opacity-70 select-none pointer-events-none focus-visible:outline-none read-only:focus:ring-0 cursor-not-allowed"
                />
              </div>
              <Input {...register('product')} value={product} type="hidden" />
              <Input {...register('user')} value={user.id} type="hidden" />
              <div className="grid gap-2 py-2">
                <Label htmlFor="comment">Review Text</Label>
                <Textarea
                  {...register('comment')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.comment,
                  })}
                  placeholder="Great Product"
                />
                {errors?.comment && (
                  <p className="text-sm text-red-500">{errors.comment.message}</p>
                )}
              </div>

              <div className="grid gap-2 py-2">
                <Label htmlFor="rating">Rating</Label>

                <div className="flex items-center">
                  {starValues.map((value) => (
                    <Controller
                      key={value}
                      name="rating" // Name of your hidden input
                      control={control}
                      defaultValue={4}
                      render={({ field: { onChange, value: ratingValue } }) => (
                        <StarIcon
                          fill={ratingValue >= value ? 'orange' : 'none'}
                          onClick={() => onChange(value)}
                          className="w-6 h-6 cursor-pointer stroke-[1px] stroke-gray-500"
                        />
                      )}
                    />
                  ))}
                </div>
              </div>

              {errors?.product && (
                <p className="text-sm w-full my-2 text-red-500">{errors.product.message}</p>
              )}

              <Button type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ReviewForm
