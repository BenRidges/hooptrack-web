// src/components/ZoneTable.tsx
import type { ZoneStats } from '@/types/hooptrack'

const ZONE_LABEL: Record<string, string> = {
  paint: 'Paint',
  mid_range_left: 'Mid Left',
  mid_range_center: 'Mid Centre',
  mid_range_right: 'Mid Right',
  three_left_corner: 'Left Corner 3',
  three_right_corner: 'Right Corner 3',
  three_left_wing: 'Left Wing 3',
  three_right_wing: 'Right Wing 3',
  three_top: 'Top of Key 3',
}

function fgColor(pct: number) {
  if (pct >= 60) return 'text-green-400'
  if (pct >= 45) return 'text-brand-orange-accessible'
  return 'text-red-400'
}

export function ZoneTable({ stats }: { stats: ZoneStats[] }) {
  if (stats.length === 0) {
    return <p className="text-gray-600 text-sm">No shots recorded.</p>
  }

  const sorted = [...stats].sort((a, b) => b.attempts - a.attempts)

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-xs text-gray-500 uppercase tracking-wider border-b border-white/[0.06]">
          <th className="text-left pb-3">Zone</th>
          <th className="text-right pb-3">Att</th>
          <th className="text-right pb-3">Makes</th>
          <th className="text-right pb-3">FG%</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((z) => (
          <tr key={z.zone} className="border-b border-white/[0.04] last:border-0">
            <td className="py-2.5 text-gray-300">{ZONE_LABEL[z.zone] ?? z.zone}</td>
            <td className="py-2.5 text-right text-gray-500">{z.attempts}</td>
            <td className="py-2.5 text-right text-gray-500">{z.makes}</td>
            <td className={`py-2.5 text-right font-bold ${fgColor(z.fg_pct)}`}>
              {z.fg_pct.toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
