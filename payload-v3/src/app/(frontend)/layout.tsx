import React from 'react'

import { cn } from 'src/utilities/cn'
import { Providers } from '@/providers'
import { constructMetadata } from '@/utilities/constructMetadeta'
// import { InitTheme } from '@/providers/Theme/InitTheme'
// import { getServerSideURL } from '@/utilities/getURL'
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()
// export const metadata: Metadata = {
//   metadataBase: new URL(getServerSideURL()),
//   openGraph: mergeOpenGraph(),
//   twitter: {
//     card: 'summary_large_image',
//     creator: '@payloadcms',
//   },
// }

export default function RootLayout({
  review,
  children,
}: {
  review: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn('h-full scroll-smooth', inter.className)}
      suppressHydrationWarning
    >
      <head>
        {/* <InitTheme /> */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="relative flex flex-col min-h-screen h-full font-sans antialiased">
        <Providers>
          <Navbar />
          {review}
          <main className="flex-grow flex-1">{children}</main>
          <Footer />
        </Providers>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
