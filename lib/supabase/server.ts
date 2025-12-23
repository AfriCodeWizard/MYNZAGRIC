import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if environment variables are available
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not set. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  try {
    const cookieStore = await cookies()

    return createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
  } catch (error) {
    // If cookies() fails (e.g., called outside request context), throw a more helpful error
    if (error instanceof Error && error.message.includes('cookies')) {
      throw new Error('Supabase client cannot be created outside of a request context. Make sure you are calling this function from a Server Component or Route Handler.')
    }
    throw error
  }
}

/**
 * Creates a static Supabase client for use during build time (e.g., in generateStaticParams).
 * This client doesn't use cookies and is safe to use in static generation contexts.
 * Returns null if environment variables are not available (e.g., during build without env vars).
 */
export function createStaticClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    console.warn('Supabase environment variables not available. Static generation will be skipped.')
    return null
  }
  
  return createSupabaseClient(url, key)
}



