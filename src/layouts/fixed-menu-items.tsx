import { networksConfig } from '@/config/networks';
import { routes } from '@/config/routes';
import { atom } from 'jotai';
import { PiHouse, PiLightning } from 'react-icons/pi';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: React.JSX.Element;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  icon: React.JSX.Element;
  href?: string;
  title?: string;
  menuItems: ItemType[];
}

export const menuItems: MenuItemsType[] = [
  {
    id: '1',
    name: 'Home',
    icon: <PiHouse className="h-auto w-6" />,
    href: '/',
    menuItems: [],
  },
  {
    id: '2',
    name: 'Networks',
    title: 'Networks',
    icon: <PiLightning className="h-auto w-6" />,
    menuItems: Object.entries(networksConfig)?.map(
      ([networkName, network]) => ({
        name: network.label,
        href: routes.dashboard.network(networkName),
        icon: network.icon,
      })
    ),
  },
];
export const selectedMenuItemAtom = atom(menuItems[0]);
