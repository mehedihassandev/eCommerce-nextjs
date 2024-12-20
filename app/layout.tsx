import type { Metadata } from 'next';
import './globals.css';
import { NotificationProvider } from '@/components/notification-hook/notification-hook';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { NetworkDetectorProvider } from '@/components/network-detector/network-detector';

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
      <body className="bg-background dark:bg-gray-900 text-foreground dark:text-white">
        <NotificationProvider>
          <NetworkDetectorProvider>
            <Header />
            {children}
            <Footer />
          </NetworkDetectorProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
