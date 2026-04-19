// src/app/dashboard/badges/page.tsx
import { createClient } from '@/lib/supabase/server'
import { BadgeGrid } from '@/components/BadgeGrid'

export default async function BadgesPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('earned_badges')
    .select('id, badge_id, rank, mmr, earned_at')
    .order('earned_at', { ascending: false })

  const badges = data ?? []

  return (
    <div>
      <h1 className="text-2xl font-black mb-2">Badges</h1>
      <p className="text-gray-500 text-sm mb-8">{badges.length} earned</p>
      <BadgeGrid badges={badges} />
    </div>
  )
}
