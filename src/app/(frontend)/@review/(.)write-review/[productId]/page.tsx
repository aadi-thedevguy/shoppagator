import ReviewForm from '@/components/review/ReviewForm'
import { redirect } from 'next/navigation'
import CloseModal from '@/components/CloseModal'
import { getMeUser } from '@/utilities/getMeUser'

type Params = Promise<{ productId: string }>
const page = async ({ params }: { params: Params }) => {
  const { user } = await getMeUser()
  const { productId } = await params

  if (!user) {
    redirect(`/sign-in?review&product=${productId}`)
  }
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-[1000] flex justify-center items-center">
      <div className="relative max-w-lg mt-10 bg-white w-full mx-auto h-fit px-2 py-12 rounded-lg">
        <div className="absolute top-4 right-4">
          <CloseModal />
        </div>
        <ReviewForm user={user} product={productId} />
      </div>
    </div>
  )
}

export default page
