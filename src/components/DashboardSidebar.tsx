'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/sessions', label: 'Sessions' },
  { href: '/dashboard/progress', label: 'Progress' },
  { href: '/dashboard/badges', label: 'Badges' },
]

export function DashboardSidebar({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-44 min-h-screen bg-bg-dark border-r border-white/[0.06] p-4 shrink-0">
        <div className="text-brand-orange-accessible font-black text-base mb-8 px-2">
          🏀 HoopTrack
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-brand-orange/10 text-brand-orange-accessible font-semibold'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-gray-600 px-2 mb-2 truncate">{email}</div>
        <button
          onClick={signOut}
          className="text-xs text-gray-500 hover:text-white transition-colors text-left px-2"
        >
          Sign out
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-bg-dark border-b border-white/[0.06]">
        <span className="text-brand-orange-accessible font-black">🏀 HoopTrack</span>
        <nav className="flex gap-3 text-xs text-gray-400">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'text-brand-orange-accessible font-semibold' : 'hover:text-white'}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={signOut} className="text-xs text-gray-500 hover:text-white">
          Sign out
        </button>
      </div>
    </>
  )
}
