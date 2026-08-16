import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { User } from '../payload-types'

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token?: string
  user: User | null
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  // Auth locally instead of HTTP-fetching `/api/users/me`. A self-fetch during
  // SSR/build often returns an HTML document (404/error page), which then fails
  // with: Unexpected token '<', "<!DOCTYPE "... is not valid JSON.
  let user: User | null = null
  try {
    const payload = await getPayload({ config: configPromise })
    const { user: authUser } = await payload.auth({ headers: await headers() })
    user = (authUser as User | null) ?? null
  } catch {
    user = null
  }

  if (validUserRedirect && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && !user) {
    redirect(nullUserRedirect)
  }

  return {
    token,
    user,
  }
}
