import '@arthur.eudeline/starbucks-tp-kit/styles';
import type { Metadata } from "next";
import { Lexend as Font } from "next/font/google";
import "./globals.css";
import { Footer } from '@arthur.eudeline/starbucks-tp-kit/components/footer';
import { Menu } from '@/components/menu';
import { SessionProvider } from 'next-auth/react';

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Starbucks',
    template: '%s - Starbucks',
  },
  robots: {
    index: false,
    follow: false
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={font.className} suppressHydrationWarning>
      <SessionProvider>
        <Menu />
        {children}
        <Footer />
      </SessionProvider>
      </body>
    </html>
  );
}
