import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { AudioProvider } from '@/components/contexts/AudioContext';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Beestrong',
  description:
    'Forta divina, direct de la albina! Nu conteaza cat de slab ai inceput, cu noile produse de la Beestrong n-ai cum sa nu te simti puternic!!!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-black">
        <head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link rel="icon" href="/beestrongIcon.ico" sizes="32x32" />
          <link
            rel="apple-touch-icon"
            href="/beestrongIcon.ico"
            sizes="32x32"
          />
        </head>
        <body className={`antialiased`}>
          <AudioProvider>
            {children}
            <Toaster />
          </AudioProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
