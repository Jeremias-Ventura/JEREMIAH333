import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - JEREMIAH33:3',
  description: 'View your focus session statistics, track your progress, and see your consistency streaks.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
