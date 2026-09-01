import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Sidebar from './components/sidebar'
import { Analytics } from '@vercel/analytics/react'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Renato Torres Next.js Portfolio',
    template: '%s | Renato Torres Next.js Portfolio',
  },
  description: 'Renato Torres\' portfolio.',
  openGraph: {
    title: 'Renato Torres Next.js Portfolio',
    description: 'This is Renato Torres\' portfolio.',
    url: baseUrl,
    siteName: 'Renato Torres Next.js Portfolio',
    locale: 'en_US',
    type: 'website',
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
    >
      <body className="bg-white text-black dark:bg-neutral-900 dark:text-white">
        <div className="relative min-h-screen w-full md:h-screen md:overflow-y-auto">
          <div className="mx-auto max-w-6xl px-6 pt-[5%] md:flex md:gap-12 md:pb-12">
            <aside className="w-full shrink-0 md:w-48">
              <Sidebar />
            </aside>
            <main className="flex-1">
              <section className="w-full max-w-2xl">
                {children}
                <Footer />
                <Analytics />
              </section>
            </main>
          </div>
        </div>
      </body>

      {/* <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </main>
      </body> */}
    </html>
  )
}
