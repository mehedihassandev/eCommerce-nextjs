import { HeartIcon, SearchIcon, ShoppingCart } from 'lucide-react';

import { INavItem } from '../models/menu';

import { ROUTER } from './router';

export const navItems: INavItem[] = [
  { title: 'Home', href: ROUTER.HOME },
  {
    title: 'Shop',
    href: `/${ROUTER.SHOP}`,
    hasSubMenu: true,
    subMenu: [
      {
        title: 'Mobile Store',
        href: `/${ROUTER.SHOP}/${ROUTER.MOBILE_STORE}`,
      },
      {
        title: 'Laptop Store',
        href: `/${ROUTER.LAPTOP_STORE}`,
      },
    ],
  },
  {
    title: 'Products',
    href: `/${ROUTER.PRODUCT}`,
    hasSubMenu: true,
    subMenu: [
      {
        title: 'Popular Products',
        href: `/${ROUTER.POPULAR_PRODUCTS}`,
      },
      {
        title: 'New Arrivals',
        href: `/${ROUTER.NEW_ARRIVALS}`,
      },
    ],
  },
  { title: 'Blog', href: `/${ROUTER.BLOG}` },
  { title: 'Contact Us', href: `/${ROUTER.CONTACT_US}` },
  { ariaLabel: 'Search', icon: SearchIcon },
  { ariaLabel: 'Wishlist', icon: HeartIcon, to: `/${ROUTER.WHITELIST}` },
  {
    ariaLabel: 'Cart',
    icon: ShoppingCart,
    to: `/${ROUTER.CHECKOUT}`,
  },
];

export const footerMenu = {
  Shop: [
    { title: 'Shop All', href: '#' },
    { title: 'Computers', href: '#' },
    { title: 'Tablets', href: '#' },
    { title: 'Drones & Cameras', href: '#' },
    { title: 'Audio', href: '#' },
    { title: 'Mobile', href: '#' },
    { title: 'T.V & Home Cinema', href: '#' },
    { title: 'Wearable Tech', href: '#' },
    { title: 'Sale', href: '#' },
  ],
  'Customer Support': [
    { title: 'Contact Us', href: '#' },
    { title: 'Help Center', href: '#' },
    { title: 'About Us', href: '#' },
    { title: 'Careers', href: '#' },
  ],
  Policy: [
    { title: 'Shipping & Returns', href: '#' },
    { title: 'Terms & Conditions', href: '#' },
    { title: 'Payment Methods', href: '#' },
    { title: 'FAQ', href: '#' },
  ],
};
