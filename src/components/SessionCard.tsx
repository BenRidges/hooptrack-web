// src/components/SessionCard.tsx
import Link from 'next/link'

const DRILL_LABEL: Record<string, string> = {
  free_shoot: 'Free Shoot',
  shot_science: 'Shot Science',
  dribble: 'Dribble',
  agility: 'Agility',
}

interface SessionRow {
  id: string
  started_at: string
  drill_type: string | null
  shots_attempted: number | null
  fg_percent: number | null
}

export function SessionCard({ session }: { session: SessionRow }) {
  const date = new Date(session.started_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
  const time = new Date(session.started_at).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit',
  })

  return (
    <Link
      href={`/dashboard/sessions/${session.id}`}
      className="flex items-center justify-between p-4 bg-white/[0.04] border border-white/[0.06] rounded-xl hover:border-brand-orange/30 transition-colors"
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">{date} · {time}</span>
        <span className="inline-block bg-brand-orange/10 text-brand-orange-accessible text-xs font-bold px-2 py-0.5 rounded-md w-fit">
          {DRILL_LABEL[session.drill_type ?? ''] ?? session.drill_type ?? 'Unknown'}
        </span>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="text-gray-500 hidden sm:block">{session.shots_attempted ?? 0} shots</span>
        {session.fg_percent != null ? (
          <span className="text-brand-orange-accessible font-bold w-14 text-right">
            {session.fg_percent.toFixed(1)}%
          </span>
        ) : (
          <span className="text-gray-600 w-14 text-right">—</span>
        )}
      </div>
    </Link>
  )
}
