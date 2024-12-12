import { ComponentType, SVGProps } from 'react';

export interface INavItem {
  type: 'nav' | 'button';
  title?: string;
  href?: string;
  hasSubMenu?: boolean;
  subMenu?: ISubMenuItem[];
  ariaLabel?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ISubMenuItem {
  title: string;
  href: string;
  description?: string;
}
