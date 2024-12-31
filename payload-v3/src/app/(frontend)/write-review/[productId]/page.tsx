import ReviewForm from '@/components/review/ReviewForm'
import { redirect } from 'next/navigation'
import { getMeUser } from '@/utilities/getMeUser'

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { user } = await getMeUser()
  const { productId } = await params
  if (!user) {
    redirect(`/sign-in?review&product=${productId}`)
  }
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center mb-8 lg:px-0">
        <ReviewForm user={user} product={productId} />
      </div>
    </>
  )
}

export default page
