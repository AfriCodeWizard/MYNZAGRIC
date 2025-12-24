import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { getCurrentUser } from '@/lib/supabase/auth'
import { AdminNav } from '@/components/admin/admin-nav'

// Force all admin routes to be dynamic (not statically generated)
// This is required because admin routes use cookies() for authentication
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current pathname from the header set by middleware
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  
  // Check if we're on the login page - if so, skip authentication
  const isLoginPage = pathname === '/admin/login'
  
  // Only require authentication if not on the login page
  if (!isLoginPage) {
    const user = await getCurrentUser()
    if (!user) {
      redirect('/admin/login')
    }
  }

  // Don't show nav on login page
  const showNav = !isLoginPage

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {showNav && <AdminNav />}
      <main className={`container mx-auto px-4 py-8 ${!showNav ? 'flex items-center justify-center min-h-screen' : ''}`}>
        {children}
      </main>
    </div>
  )
}

