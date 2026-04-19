// src/app/dashboard/sessions/[id]/page.tsx
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ShotChart } from '@/components/ShotChart'
import { ZoneTable } from '@/components/ZoneTable'
import { classifyZone } from '@/lib/court'
import type { ZoneStats, CourtZone } from '@/types/hooptrack'

interface Props {
  params: Promise<{ id: string }>
}

const DRILL_LABEL: Record<string, string> = {
  free_shoot: 'Free Shoot', shot_science: 'Shot Science',
  dribble: 'Dribble', agility: 'Agility',
}

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: sessionData }, { data: shotsData }] = await Promise.all([
    supabase.from('training_sessions').select('*').eq('id', id).single(),
    supabase.from('shot_records').select('id, court_x, court_y, result, zone, created_at').eq('session_id', id),
  ])

  if (!sessionData) notFound()

  const session = sessionData
  // DB uses 'result' column; normalise to 'outcome' for our components
  const shots = (shotsData ?? []).map((s) => ({
    ...s,
    outcome: s.result === 'make' ? 'make' : 'miss',
  }))

  // Build zone stats
  const zoneMap = new Map<CourtZone, { attempts: number; makes: number }>()
  shots.forEach((shot) => {
    const zone = (shot.zone as CourtZone | null) ?? classifyZone(shot.court_x, shot.court_y)
    const existing = zoneMap.get(zone) ?? { attempts: 0, makes: 0 }
    zoneMap.set(zone, {
      attempts: existing.attempts + 1,
      makes: existing.makes + (shot.outcome === 'make' ? 1 : 0),
    })
  })

  const zoneStats: ZoneStats[] = Array.from(zoneMap.entries()).map(([zone, { attempts, makes }]) => ({
    zone,
    attempts,
    makes,
    fg_pct: attempts > 0 ? (makes / attempts) * 100 : 0,
  }))

  const makes = shots.filter((s) => s.outcome === 'make').length
  const overallFg = shots.length > 0 ? (makes / shots.length) * 100 : 0

  const sessionDate = new Date(session.started_at ?? '').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-4 mb-8">
        <h1 className="text-2xl font-black">
          {DRILL_LABEL[session.drill_type ?? ''] ?? session.drill_type ?? 'Session'}
        </h1>
        <span className="text-gray-500 text-sm">{sessionDate}</span>
        {shots.length > 0 && (
          <>
            <span className="text-3xl font-black text-brand-orange-accessible">
              {overallFg.toFixed(1)}%
            </span>
            <span className="text-gray-500 text-sm">
              {makes} / {shots.length} makes
            </span>
          </>
        )}
      </div>

      {shots.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              Shot Chart + Zone Heat Map
            </h2>
            <ShotChart shots={shots} zoneStats={zoneStats} />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              Zone Breakdown
            </h2>
            <ZoneTable stats={zoneStats} />
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-sm">
          No shot records for this session. Only shooting sessions have shot charts.
        </p>
      )}
    </div>
  )
}
