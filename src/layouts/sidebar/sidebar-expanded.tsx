'use client';

import StatusBadge from '@/components/get-status-badge';
import SimpleBar from '@/components/ui/simplebar';
import { useSidebars } from '@/layouts/app-layout-utils';
import { ItemType, selectedMenuItemAtom } from '@/layouts/fixed-menu-items';
import cn from '@/utils/class-names';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';
import { Collapse } from 'rizzui';

function LinkMenuItem({ item }: { item: ItemType }) {
  const pathname = usePathname();
  const isActive = item.href && pathname.includes(item.href);

  return (
    <Link
      href={item.href ?? '/'}
      className={cn(
        'flex items-center justify-between gap-3 rounded-2xl  px-4 py-2 font-medium duration-200 ',
        isActive
          ? 'bg-gray-100 text-primary dark:bg-gray-100 dark:text-primary-lighter'
          : 'hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      <div className="flex items-center gap-2 truncate">
        <span>{item.icon}</span>
        <span className="truncate">{item.name}</span>
      </div>
      {item?.badge?.length ? <StatusBadge status={item?.badge} /> : null}
    </Link>
  );
}

function CollapsibleMenuItem({ item }: { item: ItemType }) {
  const pathname = usePathname();
  const pathnameExistInDropdowns: any = item?.subMenuItems?.filter(
    (dropdownItem) => pathname.includes(dropdownItem.href)
  );
  const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);
  const isActive = item.subMenuItems?.some((subMenuItem) =>
    pathname.includes(subMenuItem.href)
  );

  return (
    <Collapse
      defaultOpen={isDropdownOpen}
      className="testing [&_>_div]:mx-4 [&_>_div]:my-2 [&_>_div]:px-4 [&_>_div]:py-2 [&_>_div]:lg:my-0 [&_>_div]:2xl:mx-0 [&_>_div]:2xl:my-0"
      panelClassName="[&_>_a]:px-0 xl:!mt-2 2xl!:mt-2 3xl:!mt-2 [&_>_a]:mx-0 [&_>_a]:py-0 [&_>_a]:ps-4 [&_>_a]:my-0 space-y-5"
      header={({ open, toggle }) => (
        <div
          onClick={toggle}
          className={cn(
            'group relative flex cursor-pointer items-center justify-between rounded-full px-4 py-2 font-medium duration-200',
            isActive || isDropdownOpen
              ? 'bg-gray-100 text-primary dark:bg-gray-100 dark:text-primary-lighter'
              : 'hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          <span className={'flex items-center gap-3 '}>
            {item.icon}
            {item.name}
          </span>

          <PiCaretDownBold
            strokeWidth={3}
            className={cn(
              'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
              open && 'rotate-0 rtl:rotate-0',
              (isActive || isDropdownOpen) &&
                'text-primary dark:text-primary-lighter'
            )}
          />
        </div>
      )}
    >
      {item?.subMenuItems?.map((subMenuItem, index) => {
        const isChildActive = pathname.includes(subMenuItem?.href);

        return (
          <Link
            href={subMenuItem?.href}
            key={subMenuItem?.name + index}
            className={cn(
              'mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize duration-200 last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
              isChildActive
                ? 'text-primary'
                : 'text-gray-500 hover:text-primary'
            )}
          >
            <div className="flex items-center truncate">
              <span
                className={cn(
                  'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                  isChildActive
                    ? 'bg-primary text-primary ring-[1px] ring-primary'
                    : 'opacity-40'
                )}
              />
              <span className="truncate">{subMenuItem?.name}</span>
            </div>
            {subMenuItem?.badge?.length ? (
              <StatusBadge status={subMenuItem?.badge} />
            ) : null}
          </Link>
        );
      })}
    </Collapse>
  );
}

export default function LeftSidebarExpandable() {
  const { expandedLeft } = useSidebars();
  const selectedMenuItem = useAtomValue(selectedMenuItemAtom);

  return (
    <div
      className={cn(
        'fixed start-[104px] top-[91px] z-50 hidden h-full w-0 overflow-x-hidden duration-200 xl:flex',
        !!expandedLeft && 'w-[294px]'
      )}
    >
      <SimpleBar className="h-[calc(100vh_-_100px)] min-w-[294px] pe-2.5">
        <p className="mb-3 text-xs font-normal uppercase tracking-widest text-gray-500">
          {selectedMenuItem.title}
        </p>
        <div className="flex flex-col gap-2">
          {selectedMenuItem.menuItems?.map((menu) => (
            <Fragment key={menu.name}>
              {menu.href ? (
                <LinkMenuItem item={menu} />
              ) : (
                <CollapsibleMenuItem item={menu} />
              )}
            </Fragment>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}
