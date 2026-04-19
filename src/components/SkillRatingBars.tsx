// src/components/SkillRatingBars.tsx

interface SkillEntry {
  label: string
  value: number
}

export function SkillRatingBars({ skills }: { skills: SkillEntry[] }) {
  return (
    <div className="space-y-4">
      {skills.map(({ label, value }) => (
        <div key={label} className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-28 shrink-0">{label}</span>
          <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-orange rounded-full transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-bold text-brand-orange-accessible w-8 text-right">
            {Math.round(value)}
          </span>
        </div>
      ))}
    </div>
  )
}
