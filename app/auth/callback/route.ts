import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    );
    // Exchange code for token, effectively logging in
    const { error: tokenError } = await supabase.auth.exchangeCodeForSession(code);
    // Grab the user's information, so we can use the preferred_username for the profile entry
    const { data: { user } } = await supabase.auth.getUser();
    // Create a new profile entry in the DB for this use, but only if they don't exist already
    const { error: insertError } = await supabase
      .from('profiles')
      .upsert([
        { user_id: user?.id, nickname: user?.user_metadata.preferred_username },
      ])
      .select();

    // TODO: I think, long term, the desire would be to not reset the username to the GitHub username on every login,
    // so people can customize them. I'm not going to work on that now though, because it's not really a part of my
    // original goal, which was to create the cool domain showcase.

    if (!tokenError && !insertError) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
