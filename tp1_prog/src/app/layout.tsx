import Providers from '@/components/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Footer } from 'tp-kit/components'
import Menu from '@/components/menu'

const inter = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - Starbucks',
    default: 'Starbucks'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header><Menu/></header>
        <Providers font={inter}>{children}</Providers>
        <Footer/>
      </body>
    </html>
  )
}
