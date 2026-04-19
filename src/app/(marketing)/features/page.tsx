import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Features' }

const FEATURE_LIST = [
  { tag: 'CV', label: 'Real-time shot detection — no manual logging' },
  { tag: 'Science', label: 'Pose estimation for release angle, arc, and elbow alignment' },
  { tag: 'Zones', label: 'Court zone map with heat map and per-zone FG% breakdown' },
  { tag: 'Goals', label: 'Set shooting goals, earn badges, track skill ratings over time' },
  { tag: 'Dribble', label: 'Hand-tracking dribble drills with AR overlay (front camera)' },
  { tag: 'Agility', label: 'Shuttle run, lane agility, and vertical jump timer' },
  { tag: 'Export', label: 'Full session JSON export and Siri Shortcuts' },
  { tag: 'Sync', label: 'Cloud sync via Supabase — your data on every device' },
  { tag: 'Privacy', label: 'Local-first: sessions saved on device first, synced when online' },
]

export default function FeaturesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-4">
        Everything you need to{' '}
        <span className="text-brand-orange-accessible">train like a pro.</span>
      </h1>
      <p className="text-gray-400 mb-12 text-lg">
        HoopTrack ships with a full suite of training tools — all on your iPhone.
      </p>
      <ul className="space-y-4">
        {FEATURE_LIST.map((f) => (
          <li key={f.label} className="flex gap-4 items-start">
            <span className="bg-brand-orange/15 text-brand-orange-accessible text-xs font-bold px-2 py-1 rounded-md mt-0.5 shrink-0">
              {f.tag}
            </span>
            <span className="text-gray-300">{f.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
