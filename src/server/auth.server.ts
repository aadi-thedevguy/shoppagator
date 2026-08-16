'use server'

import configPromise from '@/payload.config'
import { z } from 'zod'
import {
  AuthCredentialsValidator,
  forgotValidator,
  resetValidator,
} from '@/validators/account-credentials-validator'
import { cookies, headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createLocalReq, getPayload, logoutOperation } from 'payload'
import { convertZodErrors } from '@/utilities/formatZodErrors'
import { login as payloadLogin } from '@payloadcms/next/auth'

export const signUp = async (input: unknown) => {
  const validated = AuthCredentialsValidator.safeParse(input)

  if (!validated.success) {
    const errors = convertZodErrors(validated.error)
    return {
      success: false,
      errors,
      message: 'Validation Failed',
    }
  }

  const { name, email, password } = validated.data
  const payload = await getPayload({ config: configPromise })

  try {
    // check if user already exists
    const { docs: users } = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (users.length !== 0) {
      return {
        success: false,
        message: 'This email is already in use. Sign in instead?',
      }
    }

    if (!name) {
      return {
        success: false,
        message: 'User name is required',
      }
    }

    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'user',
      },
    })

    return { success: true, sentToEmail: email, message: 'Successfully signed up' }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      }
    }
    return {
      success: false,
      message: 'Internal server error',
    }
  }
}

export const signIn = async (input: unknown) => {
  const validated = AuthCredentialsValidator.safeParse(input)

  if (!validated.success) {
    const errors = convertZodErrors(validated.error)
    return {
      success: false,
      errors,
      message: '',
    }
  }

  const { email, password } = validated.data

  try {
    // Local API login does not set cookies. Use Payload's Next.js helper so the
    // httpOnly `payload-token` cookie is written on the Server Action response.
    // https://payloadcms.com/docs/authentication/operations
    await payloadLogin({
      collection: 'users',
      config: configPromise,
      email,
      password,
    })

    return { success: true, message: 'Successfully logged in', errors: {} }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        errors: {},
      }
    }
    return {
      success: false,
      message: 'Internal server error',
      errors: {},
    }
  }
}

export const signOut = async () => {
  const payload = await getPayload({ config: configPromise })
  const cookieStore = await cookies()
  const cookieName = `${payload.config.cookiePrefix}-token`
  const token = cookieStore.get(cookieName)?.value
  const authConfig = payload.collections.users.config.auth
  const cookieOptions: {
    httpOnly: boolean
    path: string
    sameSite: 'lax' | 'none' | 'strict'
    secure: boolean
    domain?: string
  } = {
    httpOnly: true,
    path: '/',
    sameSite: (typeof authConfig.cookies.sameSite === 'string'
      ? authConfig.cookies.sameSite.toLowerCase()
      : 'lax') as 'lax' | 'none' | 'strict',
    secure: authConfig.cookies.secure || false,
  }
  if (authConfig.cookies.domain) {
    cookieOptions.domain = authConfig.cookies.domain
  }

  try {
    if (token) {
      // Same JWT header strategy as getMeUser — cookie-only auth is CSRF-gated
      // and often returns user: null, which made the Next logout helper exit
      // early with "already logged out" without deleting the cookie.
      const requestHeaders = new Headers(await headers())
      requestHeaders.set('Authorization', `JWT ${token}`)
      const { user } = await payload.auth({
        headers: requestHeaders,
        canSetHeaders: false,
      })

      if (user?.collection) {
        const req = await createLocalReq({ user }, payload)
        const collection = payload.collections[user.collection]
        if (collection) {
          await logoutOperation({ allSessions: false, collection, req })
        }
      }
    }
  } finally {
    cookieStore.set(cookieName, '', {
      ...cookieOptions,
      expires: new Date(0),
      maxAge: 0,
    })
    cookieStore.delete({
      name: cookieName,
      path: cookieOptions.path,
      domain: cookieOptions.domain,
    })
    revalidatePath('/', 'layout')
  }

  return { success: true, message: 'User logged out successfully' }
}

export const verifyEmail = async (input: unknown) => {
  const validated = z.object({ token: z.string() }).safeParse(input)

  if (!validated.success) {
    throw new Error(validated.error.issues[0].message)
  }

  const { token } = validated.data
  const payload = await getPayload({ config: configPromise })

  try {
    await payload.verifyEmail({
      collection: 'users',
      token,
    })

    return {
      success: true,
      message: 'Successfully verified email',
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Internal server error: ${error.message}`)
    }
  }
}

export const forgotPassword = async (input: unknown) => {
  const validated = forgotValidator.safeParse(input)

  if (!validated.success) {
    return {
      errors: validated.error.issues[0].message,
    }
  }

  const { email } = validated.data
  const payload = await getPayload({ config: configPromise })

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: {
        email,
      },
      disableEmail: false, // you can disable the auto-generation of email via local API
    })

    return {
      errors: '',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: error.message,
      }
    }
    return {
      errors: 'Internal server error',
    }
  }
}

export const resetPassword = async (input: unknown) => {
  const validated = resetValidator.safeParse(input)

  if (!validated.success) {
    const errors = convertZodErrors(validated.error)
    return {
      success: false,
      errors,
      message: '',
    }
  }

  const { password, token } = validated.data

  const payload = await getPayload({ config: configPromise })
  try {
    await payload.resetPassword({
      collection: 'users',
      data: {
        token,
        password,
      },
      overrideAccess: true,
    })

    return {
      success: true,
      message: 'Successfully reset your password',
      errors: {},
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        errors: {},
      }
    }
    return {
      success: false,
      message: 'Unable to Reset Your Password at the moment, Try Again Later',
      errors: {},
    }
  }
}
