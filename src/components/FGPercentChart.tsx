// src/components/FGPercentChart.tsx
'use client'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

interface DataPoint {
  date: string
  fg_pct: number
}

export function FGPercentChart({ data }: { data: DataPoint[] }) {
  if (data.length === 0) {
    return <p className="text-gray-600 text-sm">Not enough sessions to show a trend.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#6b7280', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fill: '#6b7280', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(1)}%`, 'FG%']}
          contentStyle={{
            background: '#1A1426',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            color: '#fff',
          }}
          labelStyle={{ color: '#9ca3af', marginBottom: 4 }}
        />
        <Line
          type="monotone"
          dataKey="fg_pct"
          stroke="#FF6B35"
          strokeWidth={2}
          dot={{ fill: '#FF6B35', r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#FF804F' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
