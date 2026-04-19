// src/app/dashboard/progress/page.tsx
import { createClient } from '@/lib/supabase/server'
import { FGPercentChart } from '@/components/FGPercentChart'
import { SkillRatingBars } from '@/components/SkillRatingBars'

export default async function ProgressPage() {
  const supabase = await createClient()

  const [{ data: sessionsData }, { data: profileData }] = await Promise.all([
    supabase
      .from('training_sessions')
      .select('started_at, fg_percent, shots_attempted')
      .not('fg_percent', 'is', null)
      .order('started_at', { ascending: true })
      .limit(60),
    supabase
      .from('player_profiles')
      .select('name, rating_shooting, rating_ball_handling, rating_athleticism, rating_consistency, rating_volume')
      .single(),
  ])

  const chartData = (sessionsData ?? []).map((s) => ({
    date: new Date(s.started_at ?? '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    fg_pct: Number((s.fg_percent ?? 0).toFixed(1)),
  }))

  const profile = profileData

  const skillEntries = profile ? [
    { label: 'Shooting', value: profile.rating_shooting ?? 0 },
    { label: 'Ball Handling', value: profile.rating_ball_handling ?? 0 },
    { label: 'Athleticism', value: profile.rating_athleticism ?? 0 },
    { label: 'Consistency', value: profile.rating_consistency ?? 0 },
    { label: 'Volume', value: profile.rating_volume ?? 0 },
  ] : []

  return (
    <div>
      <h1 className="text-2xl font-black mb-8">Progress</h1>

      <section className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
          FG% Trend (last 60 sessions)
        </h2>
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4">
          <FGPercentChart data={chartData} />
        </div>
      </section>

      {skillEntries.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
            Skill Ratings
          </h2>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
            <SkillRatingBars skills={skillEntries} />
          </div>
        </section>
      )}
    </div>
  )
}
