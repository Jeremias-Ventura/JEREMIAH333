import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - JEREMIAH33:3',
  description: 'Learn about JEREMIAH33:3, a faith-based focus timer that pairs peaceful countdown timers with Bible verses. Discover our mission to help you stay focused while keeping God\'s truth close.',
  openGraph: {
    title: 'About JEREMIAH33:3',
    description: 'Learn about JEREMIAH33:3, a faith-based focus timer that pairs peaceful countdown timers with Bible verses.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremiah33-3.app'}/about`,
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  )
}

