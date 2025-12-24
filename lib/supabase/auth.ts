import { createClient } from './server'
import { redirect } from 'next/navigation'

export async function getCurrentUser() {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return user
  } catch (error) {
    // If Supabase client creation fails (e.g., env vars not set), return null
    console.error('Error getting current user:', error)
    return null
  }
}

export async function requireAuth() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      redirect('/login')
    }
    
    return user
  } catch (error) {
    // If there's an error, redirect to login
    console.error('Error in requireAuth:', error)
    redirect('/login')
  }
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    throw error
  }
  
  return data
}

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw error
  }
}



