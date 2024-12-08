'use client';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import {
  HeartIcon,
  SearchIcon,
  ShoppingCart,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';
import {
  useState,
  useEffect,
  ComponentPropsWithoutRef,
  forwardRef,
  ComponentType,
  SVGProps,
} from 'react';

interface INavItem {
  type: 'nav' | 'button';
  title?: string;
  href?: string;
  hasSubMenu?: boolean;
  subMenu?: ISubMenuItem[];
  ariaLabel?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

interface ISubMenuItem {
  title: string;
  href: string;
  description?: string;
}

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems: INavItem[] = [
    { type: 'nav', title: 'Home', href: '#' },
    {
      type: 'nav',
      title: 'Shop',
      href: '#',
      hasSubMenu: true,
      subMenu: [
        {
          title: 'Alert Dialog',
          href: '#',
        },
        {
          title: 'Hover Card',
          href: '#',
        },
      ],
    },
    {
      type: 'nav',
      title: 'Products',
      href: '#',
      hasSubMenu: true,
      subMenu: [
        {
          title: 'Progress',
          href: '#',
          description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
        },
        {
          title: 'Scroll-area',
          href: '#',
          description: 'Visually or semantically separates content.',
        },
      ],
    },
    { type: 'nav', title: 'Blog', href: '#' },
    { type: 'nav', title: 'About Us', href: '#' },
    { type: 'nav', title: 'Contact Us', href: '#' },
    { type: 'button', ariaLabel: 'Search', icon: SearchIcon },
    { type: 'button', ariaLabel: 'Wishlist', icon: HeartIcon },
    { type: 'button', ariaLabel: 'Cart', icon: ShoppingCart },
  ];

  return (
    <header
      className={cn(
        'border-b border-gray-200 fixed top-0 left-0 w-full z-[9999] transition-colors duration-300',
        isScrolled ? 'bg-white' : 'bg-transparent',
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span
            className={cn(
              'text-3xl font-bold',
              isScrolled ? 'text-gray-700' : 'text-white',
            )}
          >
            e-com
          </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) =>
                item.type === 'nav' ? (
                  <NavigationMenuItem key={item.title}>
                    {item.hasSubMenu ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            'bg-transparent hover:bg-transparent font-bold',
                            isScrolled
                              ? 'text-gray-700'
                              : 'text-white hover:bg-accent hover:text-accent-foreground',
                          )}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            {item.subMenu?.map((subItem) => (
                              <Item
                                key={subItem.title}
                                title={subItem.title}
                                href={subItem.href}
                                description={subItem.description}
                              />
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      item.href && (
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              'bg-transparent hover:bg-transparent font-bold',
                              isScrolled
                                ? 'text-gray-700'
                                : 'text-white hover:bg-accent hover:text-accent-foreground',
                            )}
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      )
                    )}
                  </NavigationMenuItem>
                ) : null,
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex space-x-2">
          {navItems.map((item) =>
            item.type === 'button' && item.icon ? (
              <Button
                key={item.ariaLabel}
                variant="ghost"
                size="icon"
                aria-label={item.ariaLabel}
                className={cn(
                  'hover:bg-transparent',
                  isScrolled ? 'text-gray-700' : 'text-white',
                )}
              >
                <item.icon className="h-6 w-6" />
              </Button>
            ) : null,
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            className={cn(
              'md:hidden',
              isScrolled ? 'text-gray-700' : 'text-white',
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black bg-opacity-50 md:hidden">
          <div className="fixed right-0 top-0 h-full w-full bg-white shadow-lg">
            <div className="flex items-center p-6 justify-between">
              <h4 className={cn('text-3xl font-bold text-black')}>e-com</h4>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close"
                onClick={() => setIsMenuOpen(false)}
              >
                <XIcon className="h-8 w-8 text-black" />
              </Button>
            </div>
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col p-4 space-y-4">
                {navItems.map((item) =>
                  item.type === 'nav' ? (
                    <NavigationMenuItem key={item.title}>
                      {item.hasSubMenu ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              'bg-transparent hover:bg-transparent font-bold',
                              isScrolled ? 'text-gray-700' : 'text-black',
                            )}
                          >
                            {item.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-3 p-6">
                              {item.subMenu?.map((subItem) => (
                                <Item
                                  key={subItem.title}
                                  title={subItem.title}
                                  href={subItem.href}
                                  description={subItem.description}
                                />
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        item.href && (
                          <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={cn(
                                navigationMenuTriggerStyle(),
                                'bg-transparent hover:bg-transparent font-bold',
                                isScrolled ? 'text-gray-700' : 'text-black',
                              )}
                            >
                              {item.title}
                            </NavigationMenuLink>
                          </Link>
                        )
                      )}
                    </NavigationMenuItem>
                  ) : null,
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

interface ItemProps extends ComponentPropsWithoutRef<'a'> {
  title: string;
  href: string;
  description?: string;
}

const Item = forwardRef<HTMLAnchorElement, ItemProps>(
  ({ className, title, href, description, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <p className="text-sm font-medium leading-none">{title}</p>
            {description && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {description}
              </p>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

Item.displayName = 'Item';
