import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/supabase/auth'
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
  // Protect all admin routes
  await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

