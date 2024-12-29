import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/product/ProductReel'
import { getCategories } from '@/server/queries.server'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams
  const sort = parse(params.sort)
  const category = parse(params.category)

  const categories = await getCategories()
  const label = categories.find(({ slug }) => slug === category)?.label

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? 'Browse high-quality assets'}
        query={{
          category,
          limit: 40,
          sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  )
}

export default ProductsPage
