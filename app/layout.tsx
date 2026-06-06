import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { brandIcons, brandImages, resolveImageSrc } from '@/lib/images'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const siteUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Safari Camp Lodge - Luxury African Safari Experience',
  description: 'Experience the ultimate African safari adventure at Safari Camp Lodge. Luxury accommodations, expert guides, and unforgettable wildlife encounters.',
  generator: 'v0.app',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Safari Camp Lodge',
    description:
      'Luxury African safari — premium accommodations, expert guides, unforgettable wildlife.',
    images: [
      {
        url: resolveImageSrc(brandImages.openGraph),
        width: 1200,
        height: 630,
        alt: brandImages.openGraph.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [resolveImageSrc(brandImages.openGraph)],
  },
  icons: {
    icon: [
      {
        url: brandIcons.light32,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: brandIcons.dark32,
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: brandIcons.favicon,
        sizes: '32x32',
      },
    ],
    apple: brandIcons.apple,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
