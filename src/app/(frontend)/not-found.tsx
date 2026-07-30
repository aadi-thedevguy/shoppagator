import Link from 'next/link'
import Image from 'next/image'
import { ArrowBigLeftDashIcon, HomeIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function NotFound() {
  return (
    <MaxWidthWrapper className="min-h-[70vh] my-6 flex flex-col items-center justify-items-center gap-5">
      <Image src={'/error-404.png'} alt="error street sign" height={250} width={250} />
      <h1 className="text-5xl">Page Not Found</h1>
      <p className="text-2xl mb-10">Sorry, we could not find the page you were looking for.</p>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: 'ghost' }), 'flex items-center gap-2')}
      >
        <ArrowBigLeftDashIcon className="w-4 h-4" />
        <span>Go Back To</span>
        <HomeIcon className="w-4 h-4" />
      </Link>
    </MaxWidthWrapper>
  )
}
