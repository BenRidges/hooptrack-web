import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PostHogProvider } from '@/components/PostHogProvider'
import { CookieBanner } from '@/components/CookieBanner'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </PostHogProvider>
  )
}
