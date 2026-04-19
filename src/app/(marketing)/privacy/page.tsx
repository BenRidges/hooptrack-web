import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-12">Effective date: April 19, 2026</p>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Data We Collect</h2>
        <p className="text-gray-400 leading-relaxed">
          HoopTrack collects the following data to provide its training features:
        </p>
        <ul className="text-gray-400 mt-3 space-y-2 list-disc list-inside">
          <li>Camera frames (processed on-device; not uploaded unless you enable cloud sync)</li>
          <li>Body pose keypoints for Shot Science metrics</li>
          <li>Shot coordinates (normalised court position, 0–1 scale)</li>
          <li>Session timing and drill metadata</li>
          <li>Account email address (for authentication)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Data Retention</h2>
        <ul className="text-gray-400 space-y-2 list-disc list-inside">
          <li>Session videos: deleted after 7 days by default (configurable in Profile settings)</li>
          <li>Shot and session records: retained until you delete your account</li>
          <li>You can delete all data at any time from Profile → Delete All My Data</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Third-Party Services</h2>
        <ul className="text-gray-400 space-y-2 list-disc list-inside">
          <li><strong className="text-white">Supabase</strong> — cloud database for session sync (optional; data stays local if offline)</li>
          <li><strong className="text-white">PostHog</strong> — anonymous, privacy-friendly analytics on this website only; no personal data shared</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-3">Your Rights</h2>
        <p className="text-gray-400 leading-relaxed">
          You can request deletion of all your data by using the in-app delete feature
          (Profile → Delete All My Data) or by contacting us at{' '}
          <a href="mailto:benr@edgesemantics.com" className="text-brand-orange-accessible hover:underline">
            benr@edgesemantics.com
          </a>
          . We will respond within 30 days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Contact</h2>
        <p className="text-gray-400">
          <a href="mailto:benr@edgesemantics.com" className="text-brand-orange-accessible hover:underline">
            benr@edgesemantics.com
          </a>
        </p>
      </section>
    </div>
  )
}
