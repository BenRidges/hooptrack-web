import Link from 'next/link'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-md border-b border-white/[0.06]">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-brand-orange-accessible font-black text-lg tracking-tight">
          🏀 HoopTrack
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/support" className="hover:text-white transition-colors">Support</Link>
          <Link
            href="#download"
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Download
          </Link>
        </div>
      </nav>
    </header>
  )
}
