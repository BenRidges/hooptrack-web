import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/[0.06] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <span>© {new Date().getFullYear()} HoopTrack</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
          <Link href="/support" className="hover:text-gray-300 transition-colors">Support</Link>
          <Link href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</Link>
        </div>
      </div>
    </footer>
  )
}
