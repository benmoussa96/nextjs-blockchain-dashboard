'use client';

// import Header from '@/layouts/app-header';
import { useSidebars } from '@/layouts/app-layout-utils';
import Header from '@/layouts/header';
import LeftSidebarFixed from '@/layouts/sidebar/left-sidebar-fixed';
import SidebarExpandable from '@/layouts/sidebar/sidebar-expanded';
import cn from '@/utils/class-names';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { expandedLeft } = useSidebars();

  return (
    <main className={cn('flex min-h-screen flex-grow')}>
      <LeftSidebarFixed />
      <SidebarExpandable />
      <div className="flex w-full flex-col ">
        <Header className="xl:ms-[88px]" />
        <div
          className={cn(
            'flex flex-grow flex-col gap-4 px-4 pb-6 duration-200 md:px-5 lg:pb-8  xl:pe-8 ',
            expandedLeft ? 'xl:ps-[414px]' : 'xl:ps-[110px]'
          )}
        >
          <div className="grow xl:mt-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
