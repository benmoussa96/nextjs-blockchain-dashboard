import { inter, lexendDeca } from '@/app/fonts';
import '@/app/globals.css';
import GlobalDrawer from '@/app/shared/drawer-views/container';
import GlobalModal from '@/app/shared/modal-views/container';
import { siteConfig } from '@/config/site.config';
import AppLayout from '@/layouts/app-layout';
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
        <AppLayout>
          <NextProgress />
          {children}
          <GlobalDrawer />
          <GlobalModal />
        </AppLayout>
      </body>
    </html>
  );
}
