'use client'
import posthog from 'posthog-js'
import { useState } from 'react'

const CONSENT_KEY = 'hooptrack_analytics_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem(CONSENT_KEY)
  })

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    posthog.set_config({ persistence: 'localStorage+cookie' })
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-bg-dark border-t border-white/[0.08] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <p className="text-sm text-gray-400 flex-1">
        We use anonymous analytics to improve HoopTrack. No personal data is sold.{' '}
        <a href="/privacy" className="underline text-brand-orange-accessible hover:text-white">
          Privacy policy
        </a>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="text-sm bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-4 py-2 rounded-xl transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
