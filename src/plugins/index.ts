// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { Plugin } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Product } from '@/payload-types'

const generateTitle: GenerateTitle<Product> = ({ doc }) => {
  return doc?.name ? `${doc.name} | Shoppagator` : 'Shoppagator - the marketplace for digital assets'
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    collections: ['products'],
    uploadsCollection: "media",
  }),
  // payloadCloudPlugin(),
]
