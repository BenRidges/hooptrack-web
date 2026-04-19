import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HoopTrack — Basketball Training Tracker',
}

const FEATURES = [
  {
    icon: '🎯',
    title: 'CV Shot Tracking',
    body: 'Computer vision automatically detects every make and miss — no manual logging.',
  },
  {
    icon: '📐',
    title: 'Shot Science',
    body: 'Pose estimation measures release angle, elbow alignment, and shot arc every rep.',
  },
  {
    icon: '⚡',
    title: 'Agility Drills',
    body: 'Shuttle run, lane agility, and vertical jump tracking built right in.',
  },
]

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-bg-card to-bg-deep py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-orange-accessible text-xs font-bold uppercase tracking-widest mb-4">
              Basketball training, reimagined
            </p>
            <h1 className="text-5xl font-black leading-tight">
              Train smarter.{' '}
              <span className="text-brand-orange-accessible">Track every shot.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              HoopTrack uses computer vision to automatically log your shots, map
              your zones, and reveal the patterns that improve your game.
            </p>
            <div id="download" className="mt-8 flex gap-4 items-center flex-wrap">
              <a
                href="https://apps.apple.com/app/hooptrack/id000000000"
                aria-label="Download HoopTrack on the App Store"
              >
                <img src="/app-store-badge.svg" alt="Download on the App Store" width={160} height={54} />
              </a>
              <Link
                href="/features"
                className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
              >
                See all features →
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[220px] h-[440px] bg-bg-card rounded-3xl border border-white/10 flex items-center justify-center text-gray-600 text-sm">
              App screenshot
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">
            Everything you need to{' '}
            <span className="text-brand-orange-accessible">train like a pro.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot gallery */}
      <section className="py-16 px-6 bg-bg-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-10">See it in action</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[180px] h-[360px] bg-bg-card rounded-2xl border border-white/10 flex items-center justify-center text-gray-600 text-xs"
              >
                Screenshot {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-black mb-4">Ready to elevate your game?</h2>
        <p className="text-gray-400 mb-8">Free to download. No subscription required.</p>
        <a
          href="https://apps.apple.com/app/hooptrack/id000000000"
          aria-label="Download HoopTrack on the App Store"
          className="inline-block"
        >
          <img src="/app-store-badge.svg" alt="Download on the App Store" width={160} height={54} />
        </a>
      </section>
    </>
  )
}
