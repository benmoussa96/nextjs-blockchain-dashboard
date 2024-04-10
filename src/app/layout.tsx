import { inter, lexendDeca } from '@/app/fonts';
import '@/app/globals.css';
import { siteConfig } from '@/config/site.config';
import cn from '@/utils/class-names';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <NextProgress />
        {children}
      </body>
    </html>
  );
}
