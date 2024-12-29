'use client'

import { LogOut, Menu, UserRoundCheck, UserRoundPlus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useAuth } from '@/hooks/use-auth'
import { Category, User } from '@/payload-types'

type Props = {
  user: User | null
  categories: Category[]
}
const MobileNav = ({ user, categories }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { signOut } = useAuth()
  const pathname = usePathname()

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    )

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {categories.map((category) => (
                  <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                          {category.label}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                      {category.featured &&
                        category.featured.map((item) => (
                          <div key={item.name} className="group relative text-sm">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                fill
                                src={
                                  typeof item.image === 'object' && item.image.url
                                    ? item?.image?.url
                                    : item.image.toString()
                                }
                                alt="product category image"
                                className="object-cover object-center"
                              />
                            </div>

                            <Link
                              href={`/products?category=${category.slug}&sort=desc`}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              {item.name}
                            </Link>
                          </div>
                        ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                {!user ? (
                  <Link
                    onClick={() => closeOnCurrent('/sign-in')}
                    href="/sign-in"
                    className="-m-2 p-2 flex items-center gap-2 font-medium text-gray-900"
                  >
                    <span>Sign in</span>
                    <UserRoundPlus size={16} />
                  </Link>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-mx-2 p-2 flex items-center gap-2 font-medium text-gray-900"
                      disabled
                    >
                      <span>{user.name}</span>
                      <UserRoundCheck size={14} />
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={signOut}
                      className="-m-2 p-2 mb-4 flex items-center gap-2 font-medium text-gray-900"
                    >
                      <span>Log out</span>
                      <LogOut size={16} />
                    </Button>

                    <hr />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
