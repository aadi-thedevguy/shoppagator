'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import Link from 'next/link'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

const Footer = () => {
  const pathname = usePathname()
  // const pathsToDisplay = ["/products", "/", "/cookie", "/tos"];
  const pathsToDisplay: string[] = []

  return (
    <footer className="bg-primary-foreground flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200 dark:border-gray-500">
          {pathsToDisplay.includes(pathname) ? (
            <div className="pb-8 pt-16">
              <div className="flex justify-center">
                <Icons.logo className="h-12 w-auto" />
              </div>
            </div>
          ) : null}

          {pathsToDisplay.includes(pathname) ? (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div
                    aria-hidden="true"
                    className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90"
                  />
                </div>

                <div className="text-center relative mx-auto max-w-sm">
                  <h3 className="font-semibold text-gray-900">Become a seller</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If you&apos;d like to sell high-quality digital products, you can do so in
                    minutes.{' '}
                    <Link
                      href="/sign-in?as=seller"
                      className="whitespace-nowrap font-medium text-black hover:text-zinc-900"
                    >
                      Get started &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          {/* <ThemeSelector /> */}

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex flex-col gap-4 justify-center sm:flex-row sm:space-x-8">
              <Link href="/tos" className="text-sm text-muted-foreground hover:text-gray-600">
                Terms of Service
              </Link>
              <Link
                href="/contact-us"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              <Link href="/cookie" className="text-sm text-muted-foreground hover:text-gray-600">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="text-center mt-6 md:text-right md:mt-0">
            <p className="text-sm text-muted-foreground/70">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
