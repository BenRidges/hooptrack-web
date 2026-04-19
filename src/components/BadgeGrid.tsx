// src/components/BadgeGrid.tsx

interface BadgeRow {
  id: string
  badge_id: string
  rank: string
  mmr: number
  earned_at: string
}

export function BadgeGrid({ badges }: { badges: BadgeRow[] }) {
  if (badges.length === 0) {
    return (
      <p className="text-gray-600 text-sm">
        No badges earned yet — keep training in the app!
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 flex flex-col items-center text-center"
        >
          <div className="text-3xl mb-2">🏅</div>
          <p className="text-sm font-bold">{badge.badge_id}</p>
          <p className="text-xs text-brand-orange-accessible mt-1">{badge.rank}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(badge.earned_at).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </p>
        </div>
      ))}
    </div>
  )
}
