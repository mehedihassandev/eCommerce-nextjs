import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { NotificationProvider } from '@/components/notification-hook/notification-hook';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { NetworkDetectorProvider } from '@/components/network-detector/network-detector';
import { QueryProvider } from '@/lib';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'e-com',
  description: 'A simple e-commerce site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
          <NetworkDetectorProvider>
            <QueryProvider>
              <Header />
              {children}
              <Footer />
            </QueryProvider>
          </NetworkDetectorProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
