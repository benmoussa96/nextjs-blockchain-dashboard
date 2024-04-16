'use client';

import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';

type NetworkLayoutProps = {} & PageHeaderTypes;

export default function NetworkLayout({
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
