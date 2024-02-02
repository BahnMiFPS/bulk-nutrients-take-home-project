import Navbar from './components/Navbar';
import './globals.css';

import { Suspense } from 'react';
import { Providers } from './providers';

export const metadata = {
  title: 'Bulk Nutrients',
  description: 'Bulk Nutrients Take Home Project.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      {/* Adding suppressHydrationWarning as suggested by next-themes */}
      <body className="h-full bg-gray-50 dark:bg-neutral-900">
        <Providers>
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
