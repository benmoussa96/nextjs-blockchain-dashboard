'use client';

import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';

type NetworkLayoutProps = {
  data?: unknown[];
  header?: string;
  fileName?: string;
} & PageHeaderTypes;

export default function NetworkLayout({
  data,
  header,
  fileName,
  children,
  ...props
}: React.PropsWithChildren<NetworkLayoutProps>) {
  return (
    <>
      <PageHeader {...props}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0"></div>
      </PageHeader>

      {children}
    </>
  );
}
