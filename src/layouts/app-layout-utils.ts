'use client';

import { atom, useAtom } from 'jotai';
import { MenuItemsType } from './fixed-menu-items';

const LOCAL_STORAGE_KEY = 'iso-sidebar-left-expanded';

const isomorphicSidebarLeftExpandedAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_KEY)
    : false
);

const isomorphicSidebarLeftExpandedAtomWithPersistence = atom(
  (get) => get(isomorphicSidebarLeftExpandedAtom),
  (get, set, newStorage: any) => {
    set(isomorphicSidebarLeftExpandedAtom, newStorage);
    localStorage.setItem(LOCAL_STORAGE_KEY, newStorage);
  }
);

export function useSidebars() {
  const [expandedLeft, setExpandedLeft] = useAtom(
    isomorphicSidebarLeftExpandedAtomWithPersistence
  );

  return {
    expandedLeft: !!(expandedLeft === null
      ? true
      : JSON.parse(expandedLeft as string)),
    setExpandedLeft,
  };
}

export function getActiveMainMenuIndex(
  pathname: string,
  menuItems: MenuItemsType[]
) {
  let activeIndex = 0;
  for (let i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    for (let j = 0; j < menuItem.menuItems.length; j++) {
      const items = menuItem.menuItems[j];
      if (items.href && pathname.includes(items.href)) {
        activeIndex = i;
        break;
      } else {
        if (items.subMenuItems) {
          for (let k = 0; k < items.subMenuItems.length; k++) {
            const subMenuItem = items.subMenuItems[k];
            if (pathname.includes(subMenuItem.href)) {
              activeIndex = i;
              break;
            }
          }
        }
      }
    }
  }
  return activeIndex;
}
