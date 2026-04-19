import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Support' }

const FAQ = [
  {
    q: 'How does shot detection work?',
    a: 'HoopTrack uses your iPhone camera with a YOLO-based computer vision model to detect the basketball and rim in real time. Every make and miss is logged automatically — no tapping required.',
  },
  {
    q: 'Do I need an internet connection to use the app?',
    a: 'No. Sessions are saved locally on your device and sync to the cloud when you have a connection. You can train fully offline.',
  },
  {
    q: 'Which iPhone models are supported?',
    a: 'HoopTrack requires iOS 16 or later. For best CV performance, an iPhone with an A15 chip or newer is recommended.',
  },
  {
    q: 'How do I delete my data?',
    a: 'Go to Profile → Delete All My Data inside the app. This permanently removes all sessions, shots, and your account from our servers.',
  },
  {
    q: 'I have a question not answered here.',
    a: 'Email us at benr@edgesemantics.com and we will get back to you within 48 hours.',
  },
]

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-4">Support</h1>
      <p className="text-gray-400 mb-12 text-lg">Frequently asked questions.</p>
      <ul className="space-y-8">
        {FAQ.map((item) => (
          <li key={item.q} className="border-b border-white/[0.06] pb-8 last:border-0">
            <h2 className="font-bold text-lg mb-2">{item.q}</h2>
            <p className="text-gray-400 leading-relaxed">{item.a}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
