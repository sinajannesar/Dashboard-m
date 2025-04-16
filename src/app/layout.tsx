import '../globals.css';
import type { Metadata } from 'next';
import SessionProviderWrapper from './providers';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'My dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
