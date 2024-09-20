import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import ClientProvider from './ClientProvider';  // Import the client-side provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Scale with TikTok Ads',
  description: 'Market Vision is a digital marketing agency that specializes in TikTok advertising. We help businesses grow their online presence and revenue through effective and proven TikTok advertising strategies.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ClientProvider wraps all children to provide session context */}
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
