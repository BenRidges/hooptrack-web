'use client'
import posthog from 'posthog-js'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      capture_pageview: true,
      persistence: 'memory', // no cookies until consent given
    })
  }, [])

  return <>{children}</>
}
