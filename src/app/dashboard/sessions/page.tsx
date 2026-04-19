// src/app/dashboard/sessions/page.tsx
import { createClient } from '@/lib/supabase/server'
import { SessionCard } from '@/components/SessionCard'

interface Props {
  searchParams: Promise<{ from?: string; to?: string; type?: string }>
}

export default async function SessionsPage({ searchParams }: Props) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('training_sessions')
    .select('id, started_at, drill_type, shots_attempted, fg_percent')
    .order('started_at', { ascending: false })
    .limit(50)

  if (params.from) query = query.gte('started_at', params.from)
  if (params.to) query = query.lte('started_at', params.to + 'T23:59:59')
  if (params.type && params.type !== 'all') query = query.eq('drill_type', params.type)

  const { data } = await query
  const sessions = data ?? []

  return (
    <div>
      <h1 className="text-2xl font-black mb-1">Sessions</h1>
      <p className="text-gray-500 text-sm mb-8">{sessions.length} sessions found</p>

      <form className="flex flex-wrap gap-3 mb-8">
        <input
          type="date"
          name="from"
          defaultValue={params.from ?? ''}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-orange/50"
        />
        <input
          type="date"
          name="to"
          defaultValue={params.to ?? ''}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-orange/50"
        />
        <select
          name="type"
          defaultValue={params.type ?? 'all'}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-orange/50"
        >
          <option value="all">All types</option>
          <option value="free_shoot">Free Shoot</option>
          <option value="shot_science">Shot Science</option>
          <option value="dribble">Dribble</option>
          <option value="agility">Agility</option>
        </select>
        <button
          type="submit"
          className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
        >
          Filter
        </button>
      </form>

      <div className="space-y-2">
        {sessions.length === 0 && (
          <p className="text-gray-600 text-sm">No sessions match your filters.</p>
        )}
        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} />
        ))}
      </div>
    </div>
  )
}
