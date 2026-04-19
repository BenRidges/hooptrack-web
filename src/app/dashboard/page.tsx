import { createClient } from '@/lib/supabase/server'
import { StatCard } from '@/components/StatCard'
import Link from 'next/link'

const DRILL_LABEL: Record<string, string> = {
  free_shoot: 'Free Shoot',
  shot_science: 'Shot Science',
  dribble: 'Dribble',
  agility: 'Agility',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [{ data: recentData }, { data: latestData }] = await Promise.all([
    supabase
      .from('training_sessions')
      .select('id, fg_percent, shots_attempted, shots_made, started_at, drill_type')
      .gte('started_at', sevenDaysAgo)
      .order('started_at', { ascending: false }),
    supabase
      .from('training_sessions')
      .select('id, fg_percent, shots_attempted, shots_made, started_at, drill_type')
      .order('started_at', { ascending: false })
      .limit(5),
  ])

  const recent = recentData ?? []
  const latest = latestData ?? []

  const totalShots = recent.reduce((acc, s) => acc + (s.shots_attempted ?? 0), 0)
  const totalMakes = recent.reduce((acc, s) => acc + (s.shots_made ?? 0), 0)
  const avgFg = totalShots > 0 ? (totalMakes / totalShots) * 100 : 0

  return (
    <div>
      <h1 className="text-2xl font-black mb-1">Overview</h1>
      <p className="text-gray-500 text-sm mb-8">Your training at a glance</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="FG% (7 days)"
          value={totalShots > 0 ? `${avgFg.toFixed(1)}%` : '—'}
          delta={totalShots > 0 ? `${totalShots} shots across ${recent.length} sessions` : undefined}
          deltaPositive
        />
        <StatCard
          label="Sessions (7 days)"
          value={String(recent.length)}
        />
        <StatCard
          label="Total shots (7 days)"
          value={totalShots > 0 ? String(totalShots) : '—'}
        />
      </div>

      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Recent Sessions</h2>
      <div className="space-y-2">
        {latest.length === 0 && (
          <p className="text-gray-600 text-sm">No sessions yet. Start training in the app!</p>
        )}
        {latest.map((s) => (
          <Link
            key={s.id}
            href={`/dashboard/sessions/${s.id}`}
            className="flex items-center justify-between p-4 bg-white/[0.04] border border-white/[0.06] rounded-xl hover:border-brand-orange/30 transition-colors"
          >
            <div>
              <span className="text-sm font-medium">
                {DRILL_LABEL[s.drill_type ?? ''] ?? s.drill_type}
              </span>
              <span className="text-gray-600 text-xs ml-3">
                {new Date(s.started_at ?? '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">{s.shots_attempted} shots</span>
              {s.fg_percent != null && (
                <span className="text-brand-orange-accessible font-bold">
                  {s.fg_percent.toFixed(1)}%
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
