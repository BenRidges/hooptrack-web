interface StatCardProps {
  label: string
  value: string
  delta?: string
  deltaPositive?: boolean
}

export function StatCard({ label, value, delta, deltaPositive }: StatCardProps) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl p-5">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{label}</p>
      <p className="text-3xl font-black">{value}</p>
      {delta && (
        <p className={`text-xs mt-1 ${deltaPositive ? 'text-brand-orange-accessible' : 'text-gray-500'}`}>
          {delta}
        </p>
      )}
    </div>
  )
}
