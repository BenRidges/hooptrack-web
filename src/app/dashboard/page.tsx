import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-bg-deep text-white p-8">
      <h1 className="text-3xl font-black mb-4">Dashboard</h1>
      <p className="text-gray-400">Welcome, {user.email}</p>
    </div>
  )
}
