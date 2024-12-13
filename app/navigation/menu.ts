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
