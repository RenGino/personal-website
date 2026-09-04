import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Sidebar from './components/sidebar'
import { Analytics } from '@vercel/analytics/react'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Renato Torres Website',
    template: '%s | Renato Torres Website',
  },
  description: 'Renato Torres\' portfolio.',
  openGraph: {
    title: 'Renato Torres Website',
    description: 'This is Renato Torres\' portfolio.',
    url: baseUrl,
    siteName: 'Renato Torres',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/pfp.png',
        width: 128,
        height: 128,
        alt: 'Profile Art',
      },
    ],
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
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="bg-white text-black dark:bg-neutral-900 dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen w-full md:h-screen md:overflow-y-auto scrollbar-gutter-stable">
            <div className="mx-auto max-w-4xl px-6 pt-[5%] flex flex-col gap-8 md:flex-row md:justify-start md:gap-10 md:pb-12">
              <aside className="w-full shrink-0 md:w-36 md:pt-4 md:-ml-6">
                <Sidebar />
              </aside>
              <main className="w-full max-w-2xl">
                <section className="w-full">
                  {children}
                  <Footer />
                  <Analytics />
                </section>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
