import { getPolicyPage } from '@/server/queries.server'
import React from 'react'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'

async function Page({ params }: { params: Promise<{ policy: string }> }) {
  const { policy } = await params
  const data = await getPolicyPage(policy)

  if (!data) return notFound()

  return (
    <section className="border rounded-sm border-border my-6 mx-auto w-fit p-4 overflow-x-hidden">
      <h1 className="text-4xl mb-6 text-primary text-center font-bold tracking-tight sm:text-6xl">
        {policy === 'cookie'
          ? 'Cookie Policy'
          : policy === 'tos'
            ? 'Terms of Service'
            : 'Privacy Policy'}
      </h1>
      {/* <article className="my-4 prose max-w-[75ch] prose-sky lg:prose-lg"> */}
      <RichText content={data} />
      {/* </article> */}
    </section>
  )
}

export default Page
