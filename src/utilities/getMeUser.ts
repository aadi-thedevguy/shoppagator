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
  const payload = await getPayload({ config: configPromise })
  const cookieStore = await cookies()
  const token = cookieStore.get(`${payload.config.cookiePrefix}-token`)?.value

  // Authenticate locally (no HTTP self-fetch to /api/users/me).
  // Cookie extraction in payload.auth() applies CSRF checks against Origin /
  // Sec-Fetch-Site. RSC and reverse-proxy requests often fail that check, so
  // also pass the token as `Authorization: JWT …` — the same strategy the
  // previous /me fetch used, and JWT is first in Payload's default jwtOrder.
  const requestHeaders = new Headers(await headers())
  if (token) {
    requestHeaders.set('Authorization', `JWT ${token}`)
  }

  const { user: authUser } = await payload.auth({
    headers: requestHeaders,
    canSetHeaders: false,
  })
  const user = (authUser as User | null) ?? null

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
