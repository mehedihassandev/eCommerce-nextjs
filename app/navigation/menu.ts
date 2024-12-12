import { HeartIcon, SearchIcon, ShoppingCart } from 'lucide-react';
import { INavItem } from '../models/menu';
import { ROUTER } from './router';

export const navItems: INavItem[] = [
  { type: 'nav', title: 'Home', href: ROUTER.HOME },
  {
    type: 'nav',
    title: 'Shop',
    href: ROUTER.SHOP,
    hasSubMenu: true,
    subMenu: [
      {
        title: 'Mobile Store',
        href: ROUTER.MOBILE_STORE,
      },
      {
        title: 'Laptop Store',
        href: ROUTER.LAPTOP_STORE,
      },
    ],
  },
  {
    type: 'nav',
    title: 'Products',
    href: ROUTER.PRODUCT,
    hasSubMenu: true,
    subMenu: [
      {
        title: 'Popular Products',
        href: ROUTER.POPULAR_PRODUCTS,
      },
      {
        title: 'New Arrivals',
        href: ROUTER.NEW_ARRIVALS,
      },
    ],
  },
  { type: 'nav', title: 'Blog', href: ROUTER.BLOG },
  { type: 'nav', title: 'Contact Us', href: ROUTER.CONTACT_US },
  { type: 'button', ariaLabel: 'Search', icon: SearchIcon },
  { type: 'button', ariaLabel: 'Wishlist', icon: HeartIcon },
  { type: 'button', ariaLabel: 'Cart', icon: ShoppingCart },
];
