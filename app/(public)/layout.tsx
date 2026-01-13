import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'JEREMIAH33:3 - Faith-Based Focus Timer',
    template: '%s | JEREMIAH33:3'
  },
  description: 'A peaceful focus timer with Bible verses. Stay focused with Scripture by your side. Track your progress and grow in discipline through faith-based productivity.',
  keywords: ['pomodoro timer', 'focus timer', 'bible verses', 'faith-based productivity', 'christian productivity', 'study timer', 'work timer', 'scripture', 'jeremiah 33:3', 'prayer timer', 'meditation timer'],
  openGraph: {
    title: 'JEREMIAH33:3 - Faith-Based Focus Timer',
    description: 'A peaceful focus timer with Bible verses. Stay focused with Scripture by your side.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremiah33-3.app',
    siteName: 'JEREMIAH33:3',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JEREMIAH33:3 - Faith-Based Focus Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JEREMIAH33:3 - Faith-Based Focus Timer',
    description: 'A peaceful focus timer with Bible verses. Stay focused with Scripture by your side.',
    images: ['/og-image.png'],
  },
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'JEREMIAH33:3',
            description: 'A peaceful focus timer with Bible verses. Stay focused with Scripture by your side.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremiah33-3.app',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Focus Timer',
              'Bible Verse Display',
              'Session Tracking',
              'Progress Dashboard',
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
