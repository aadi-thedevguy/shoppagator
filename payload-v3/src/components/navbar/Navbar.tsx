import Link from 'next/link'
import { UserRoundPlus, UserRoundCheck } from 'lucide-react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Icons } from '../Icons'
import NavItems from './NavItems'
import { Button, buttonVariants } from '../ui/button'
import Cart from '../cart/Cart'
import { getMeUser } from '@/utilities/getMeUser'
import UserAccountNav from '../UserAccountNav'
import MobileNav from './MobileNav'
import { getCategories } from '@/server/queries.server'

const Navbar = async () => {
  const { user } = await getMeUser()
  const categories = await getCategories()

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNav user={user} categories={categories} />

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:flex lg:items-center lg:self-stretch">
                {categories && categories.length > 0 ? (
                  <NavItems categories={categories} />
                ) : (
                  <Button className="gap-1.5" variant="ghost">
                    <Link href="/admin/collections/categories">Add Category</Link>
                  </Button>
                )}
              </div>

              <div className="ml-auto flex items-center">
                <div className="lg:hidden ml-4 flow-root lg:ml-6">
                  <Cart />
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: 'ghost',
                        className: 'gap-2',
                      })}
                    >
                      <span>Sign in</span>
                      <UserRoundCheck size={16} />
                    </Link>
                  )}

                  {user ? null : <span className="h-6 w-px bg-gray-200" aria-hidden="true" />}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: 'ghost',
                        className: 'gap-2',
                      })}
                    >
                      <span>Create account</span>
                      <UserRoundPlus size={16} />
                    </Link>
                  )}

                  {user ? <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar
