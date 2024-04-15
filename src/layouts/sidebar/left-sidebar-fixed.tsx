'use client';

import SimpleBar from '@/components/ui/simplebar';
import { useWindowSize } from '@/hooks/use-window-size';
import {
  getActiveMainMenuIndex,
  useSidebars,
} from '@/layouts/app-layout-utils';
import {
  MenuItemsType,
  menuItems,
  selectedMenuItemAtom,
} from '@/layouts/fixed-menu-items';
import cn from '@/utils/class-names';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PiTextIndent } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';

function MenuItem({ menu }: { menu: MenuItemsType }) {
  const pathname = usePathname();
  const router = useRouter();
  const { expandedLeft, setExpandedLeft } = useSidebars();
  const [selectedMenuItems, setSelectedMenuItems] =
    useAtom(selectedMenuItemAtom);
  const isActive = selectedMenuItems === menu;

  function handleClick() {
    setSelectedMenuItems(menu);
    if (!expandedLeft && menu.menuItems.length > 0) {
      setExpandedLeft(true);
    } else if (isActive || menu.menuItems.length <= 0) {
      setExpandedLeft(false);

      const activeMenuIndex = getActiveMainMenuIndex(pathname, menuItems);
      if (activeMenuIndex >= 0)
        setSelectedMenuItems(menuItems[activeMenuIndex]);
    }

    if (menu.href) router.push(menu.href);
  }

  return (
    <li
      onClick={handleClick}
      className="group flex cursor-pointer flex-col items-center gap-1.5 pb-1.5 "
    >
      <span
        className={cn(
          'rounded-3xl bg-gray-0/0 px-4 py-2 text-white transition-colors duration-200 group-hover:bg-gray-0 group-hover:text-gray-900 dark:group-hover:bg-gray-100',
          isActive && 'bg-gray-0 text-gray-900 dark:bg-gray-100 '
        )}
      >
        {menu.icon}
      </span>
      <span className="text-white">{menu.name}</span>
    </li>
  );
}

function MenuItems() {
  return (
    <menu className="flex w-full justify-center">
      <SimpleBar className="h-[calc(100vh_-_105px)] w-full pb-5">
        <ul className="flex flex-col gap-6">
          {menuItems.map((menu) => (
            <MenuItem key={menu.id} menu={menu} />
          ))}
        </ul>
      </SimpleBar>
    </menu>
  );
}

export default function LeftSidebarFixed() {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const setSelectedMenuItem = useSetAtom(selectedMenuItemAtom);
  const selectedMenu = useAtomValue(selectedMenuItemAtom);
  const { expandedLeft, setExpandedLeft } = useSidebars();

  const retractMenu = () => {
    const activeMenuIndex = getActiveMainMenuIndex(pathname, menuItems);
    if (activeMenuIndex >= 0) setSelectedMenuItem(menuItems[activeMenuIndex]);
    setExpandedLeft(false);
  };

  useEffect(() => {
    retractMenu();
  }, [pathname]);

  return (
    <aside className="fixed start-0 top-0 z-50 hidden h-screen w-[88px] flex-col items-center gap-10 bg-gray-900 py-3.5 xl:flex dark:bg-gray-0">
      <ActionIcon
        aria-label="open sidebar"
        variant="text"
        className="rounded-full bg-transparent text-white transition-colors hover:bg-gray-300  hover:enabled:text-gray-900"
        size="xl"
        onClick={() => {
          if (expandedLeft) {
            retractMenu();
          } else {
            setSelectedMenuItem(menuItems[1]);
            setExpandedLeft(true);
          }
        }}
      >
        <PiTextIndent className="h-auto w-9" />
      </ActionIcon>
      <MenuItems />
    </aside>
  );
}
