import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { origin } = new URL(request.url)
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const { data: { session } } = await supabase.auth.getSession();

    if(!session) {
      return NextResponse.redirect(`${origin}/login`);
    }

    return response;
}

export const config = {
  matcher: ['/u/:username*'],
}

