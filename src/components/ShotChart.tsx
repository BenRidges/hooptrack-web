// src/components/ShotChart.tsx
'use client'
import { toSvgCoords, zoneHeatColor, ZONE_POLYGONS } from '@/lib/court'
import type { ZoneStats } from '@/types/hooptrack'

interface ShotDot {
  id: string
  court_x: number
  court_y: number
  outcome: string
}

interface Props {
  shots: ShotDot[]
  zoneStats: ZoneStats[]
}

const VB_W = 470
const VB_H = 500

export function ShotChart({ shots, zoneStats }: Props) {
  const toX = (x: number) => x * VB_W
  const toY = (y: number) => y * VB_H

  const zoneColorMap = new Map(
    zoneStats.map((z) => [z.zone, zoneHeatColor(z.fg_pct)])
  )

  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full max-w-md rounded-xl border border-white/10"
          aria-label="Shot chart"
        >
          {/* Court background */}
          <rect width={VB_W} height={VB_H} fill="#D7AD6B" rx={8} />

          {/* Zone heat map overlays */}
          {Object.entries(ZONE_POLYGONS).map(([zone, points]) => {
            const color = zoneColorMap.get(zone as ZoneStats['zone'])
            if (!color) return null
            const pts = points.map(([x, y]) => `${toX(x)},${toY(y)}`).join(' ')
            return (
              <polygon
                key={zone}
                points={pts}
                fill={color}
                fillOpacity={0.35}
                stroke={color}
                strokeOpacity={0.5}
                strokeWidth={1}
              />
            )
          })}

          {/* Three-point arc */}
          <path
            d={`M ${toX(0.12)} ${toY(0)} A ${toX(0.44)} ${toX(0.44)} 0 0 1 ${toX(0.88)} ${toY(0)}`}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={2}
          />
          {/* Corner three lines */}
          <line x1={toX(0.12)} y1={toY(0)} x2={toX(0.12)} y2={toY(0.22)} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
          <line x1={toX(0.88)} y1={toY(0)} x2={toX(0.88)} y2={toY(0.22)} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
          {/* Paint */}
          <rect
            x={toX(0.31)} y={toY(0)}
            width={toX(0.38)} height={toY(0.36)}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={2}
          />
          {/* Free-throw circle */}
          <circle
            cx={toX(0.5)} cy={toY(0.36)}
            r={toX(0.12)}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.5}
          />
          {/* Basket */}
          <circle
            cx={toX(0.5)} cy={toY(0.04)}
            r={6}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={2}
          />

          {/* Shot dots */}
          {shots.map((shot) => {
            const { x, y } = toSvgCoords(shot.court_x, shot.court_y, VB_W, VB_H)
            return (
              <circle
                key={shot.id}
                cx={x}
                cy={y}
                r={6}
                fill={shot.outcome === 'make' ? '#22c55e' : '#ef4444'}
                fillOpacity={0.8}
                stroke="white"
                strokeWidth={1}
              />
            )
          })}
        </svg>

        <div className="flex gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#22c55e] inline-block" />
            Make
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block" />
            Miss
          </span>
          <span className="text-gray-600 ml-2">Heat map = FG% by zone</span>
        </div>
      </div>

      <div className="sm:hidden text-sm text-gray-500 italic">
        Shot chart available on larger screens.
      </div>
    </div>
  )
}
