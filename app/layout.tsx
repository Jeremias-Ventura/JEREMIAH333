import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JEREMIAH33:3 - Timer & Verse",
  description: "A peaceful focus timer with Bible verses. Stay focused with Scripture by your side.",
  keywords: ["pomodoro timer", "focus timer", "bible verses", "faith-based productivity", "christian productivity", "study timer", "work timer", "scripture", "jeremiah 33:3"],
  authors: [{ name: "JEREMIAH33:3" }],
  creator: "JEREMIAH33:3",
  publisher: "JEREMIAH33:3",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremias33-3.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "JEREMIAH33:3 - Timer & Verse",
    description: "A peaceful focus timer with Bible verses. Stay focused with Scripture by your side.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremias33-3.app',
    siteName: "JEREMIAH33:3",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // You'll add this later
        width: 1200,
        height: 630,
        alt: "JEREMIAH33:3 - Faith-Based Focus Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JEREMIAH33:3 - Timer & Verse",
    description: "A peaceful focus timer with Bible verses. Stay focused with Scripture by your side.",
    images: ["/og-image.png"], // You'll add this later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full md:h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${lora.variable} font-sans antialiased h-full md:h-full flex flex-col`}
      >
        <ConditionalHeader />
        <main className="flex-1 overflow-hidden md:overflow-hidden overflow-y-auto md:overflow-y-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
