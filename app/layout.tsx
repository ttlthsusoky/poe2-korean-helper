import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'POE2헬퍼 - Path of Exile 2 가이드 및 도구',
  description: 'Path of Exile 2 한국 커뮤니티를 위한 필수 도구 모음. 유용한 사이트 링크, 게임 용어 번역, 빌드 가이드를 제공하는 비공식 앱입니다.',
  keywords: 'Path of Exile 2, PoE2, 게임 가이드, 빌드, 커뮤니티, 도구, 번역, 한국어, 패스 오브 엑자일',
  robots: 'index, follow',
  category: 'Games',
  authors: [{ name: 'POE2 Korean Community' }],
  creator: 'POE2 Korean Community',
  publisher: 'POE2 Korean Community',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/icons/icon-192x192.png',
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'poe2헬퍼',
    startupImage: [
      {
        url: '/icons/icon-512x512.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://poe2-korean-helper.vercel.app',
    siteName: 'POE2헬퍼',
    title: 'poe2헬퍼 - Path of Exile 2 커뮤니티 도구',
    description: 'PoE2 커뮤니티를 위한 유용한 사이트 모음과 한국어 번역 도구. 비공식 앱입니다.',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'poe2헬퍼',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'poe2헬퍼',
    description: 'PoE2 커뮤니티를 위한 유용한 사이트 모음과 한국어 번역 도구',
    images: ['/icons/icon-512x512.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d4af37' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="poe2헬퍼" />
        <meta name="apple-mobile-web-app-title" content="poe2헬퍼" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body className="min-h-screen bg-poe-dark">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}