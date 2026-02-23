import React from "react"
import type { Metadata } from 'next'
import { Josefin_Sans, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SessionProvider } from '@/components/session-provider'
import './globals.css'

const _josefinSans = Josefin_Sans({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  variable: "--font-josefin"
});

const _poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: 'Big Five | Bootcamps Digitaux',
  description: 'Développez vos compétences digitales avec nos bootcamps intensifs. Formation professionnelle en stratégie digitale à Abidjan, Côte d\'Ivoire.',
  generator: 'v0.app',
  keywords: ['bootcamp', 'formation digitale', 'Abidjan', 'Côte d\'Ivoire', 'marketing digital', 'social media'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
