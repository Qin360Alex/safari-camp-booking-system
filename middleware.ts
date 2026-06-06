import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/guest', '/admin', '/book/pay'] as const

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (!isProtected) return NextResponse.next()

  const sessionCookie = getSessionCookie(request)
  if (sessionCookie) return NextResponse.next()

  const signIn = new URL('/auth/sign-in', request.url)
  signIn.searchParams.set('callbackUrl', pathname + request.nextUrl.search)
  return NextResponse.redirect(signIn)
}

export const config = {
  matcher: ['/guest/:path*', '/admin/:path*', '/book/pay'],
}
