import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If this is an API request, bypass all redirects and transformations
  if (pathname.startsWith('/api/')) {
    console.log('API request detected:', pathname)
    return NextResponse.next()
  }

  // For non-API requests, check if we're on aroofabove.vercel.app
  if (request.headers.get('host')?.includes('aroofabove.vercel.app')) {
    const url = request.nextUrl.clone()
    url.host = 'site.aroofabove.co'
    url.protocol = 'https'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Update the matcher to explicitly handle API routes
export const config = {
  matcher: [
    // Match API routes
    '/api/:path*',
    // Match all other routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
