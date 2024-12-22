import type { Metadata } from 'next';

import { ReactNode } from 'react';

import { NetworkDetectorProvider } from '@/components/network-detector/network-detector';
import { NotificationProvider } from '@/components/notification-hook/notification-hook';
import { QueryProvider } from '@/utils';

import { Footer } from './layout/footer';
import { Header } from './layout/header';

import './globals.css';

export const metadata: Metadata = {
  title: 'e-com',
  description: 'A simple e-commerce site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background dark:bg-gray-900 text-foreground dark:text-white">
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
