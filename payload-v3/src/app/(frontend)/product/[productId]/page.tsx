import AddToCartButton from '@/components/cart/AddToCartButton'
import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/product/ProductReel'
import Rating from '@/components/review/Rating'
import Reviews from '@/components/review/Reviews'
import RichText from '@/components/RichText'
import { getProduct, getReviewStats } from '@/server/queries.server'
import { formatPrice } from '@/utilities/formatPrice'
import { Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    productId: string
  }>
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]

const Page = async ({ params }: PageProps) => {
  const { productId } = await params

  const product = await getProduct(productId)

  if (!product) return notFound()

  const { averageRating, reviews, ratingCounts } = await getReviewStats(productId)
  const label = typeof product.category === 'object' ? product.category.label : product.category

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[]

  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-3 flex items-center">
                <Rating rating={averageRating} />
                {reviews.length > 0 && <p>{reviews.length} Rating(s)</p>}
              </div>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">{formatPrice(product.price)}</p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              {product.description && (
                <div className="mt-4 space-y-6 prose prose-stone">
                  <RichText content={product.description} />
                </div>
              )}

              <div className="mt-6 flex items-center">
                <Check aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-green-500" />
                <p className="ml-2 text-sm text-muted-foreground">Eligible for instant delivery</p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={validUrls} />
            </div>
          </div>

          {/* add to cart part */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield aria-hidden="true" className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* review grid */}
      <Reviews
        reviews={reviews}
        productId={productId}
        averageRating={averageRating}
        ratingCounts={ratingCounts}
      />

      <ProductReel
        href="/products"
        query={{
          category:
            typeof product.category !== 'string' ? product?.category?.slug : product.category,
          limit: 4,
        }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
      />
    </MaxWidthWrapper>
  )
}

export default Page
