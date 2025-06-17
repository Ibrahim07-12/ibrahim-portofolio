import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout'; // Kita akan membuat file ini

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://github.com/Ibrahim07-12'),
  title: 'Muhammad Ibrahim Musyaffa | Electronics Engineering Portfolio',
  description: 'Portfolio of Muhammad Ibrahim Musyaffa, a D4 Electronics Engineering student specializing in robotics, AI, IoT, and UAV technology.',
  keywords: 'electronics engineering, robotics, IoT, UAV, Muhammad Ibrahim Musyaffa, engineering portfolio',
  openGraph: {
    title: 'Muhammad Ibrahim Musyaffa | Electronics Engineering Portfolio',
    description: 'Portfolio of Muhammad Ibrahim Musyaffa, a D4 Electronics Engineering student specializing in robotics, AI, IoT, and UAV technology.',
    url: 'https://github.com/Ibrahim07-12',
    siteName: 'Muhammad Ibrahim Portfolio',
    images: [
      {
        url: '/images/portfolio-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Muhammad Ibrahim Musyaffa Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}