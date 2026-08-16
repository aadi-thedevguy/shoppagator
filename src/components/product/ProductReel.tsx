'use client'

import { TQueryValidator } from '@/validators/query-validator'
import { Product } from '@/payload-types'
import Link from 'next/link'
import ProductListing from './ProductListing'
import { getInfiniteProducts } from '@/server/queries.server'
import { buttonVariants } from '../ui/button'
import useSWRInfinite from 'swr/infinite'

interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
  query: TQueryValidator
}

const FALLBACK_LIMIT = 4

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props

  const { data: queryResults, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.nextPage) return null
      return ['products', query, previousPageData?.nextPage ?? 1] as const
    },
    ([, pageQuery, cursor]) => getInfiniteProducts({ query: pageQuery, cursor }),
  )

  const products = queryResults?.flatMap((page) => page.items)
  // SWR is paused during SSR, so `isLoading` is false with no data. Treat
  // unresolved data as loading to keep the skeleton until the client fetch.
  const isLoading = queryResults === undefined && !error

  let map: (Product | null)[] = []
  if (products && products.length) {
    map = products
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null)
  }

  return (
    <section className="py-12">
      {!isLoading && (!products || !products.length) ? (
        <section className="mx-auto text-center my-10">
          <h2 className="text-2xl font-bold text-gray-900">No Products Found.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <Link
              href="/admin/collections/products"
              className={buttonVariants({ variant: 'link' })}
            >
              Add Products
            </Link>{' '}
            to view them here
          </p>
        </section>
      ) : (
        <>
          <div className="md:flex md:items-center md:justify-between mb-4">
            <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
              {title ? (
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
              ) : null}
              {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>

            {href ? (
              <Link
                href={href}
                className="hidden text-sm font-medium text-primary/80 hover:text-primary md:block"
              >
                Shop the collection <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </div>
          <div className="relative">
            <div className="mt-6 flex items-center w-full">
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                {map.map((product, i) => (
                  <ProductListing key={`product-${i}`} product={product} index={i} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default ProductReel
