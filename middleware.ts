import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { origin } = new URL(request.url)
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const { data: { session } } = await supabase.auth.getSession();

    const requestedPage = request.nextUrl.pathname;

    // User profile paths, we don't want to guard the OpenGraph routes
    const usernameOpenGraphPattern = /\/u\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})\/opengraph-image$/;

    const found = requestedPage.match(usernameOpenGraphPattern);

    if(!session && !found) {
      return NextResponse.redirect(`${origin}/login?next=${encodeURIComponent(requestedPage)}`);
    }

    return response;
}

export const config = {
  matcher: ['/u/:username*'],
}

