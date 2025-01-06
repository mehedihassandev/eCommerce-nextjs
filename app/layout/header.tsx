'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

import { Badge } from '@/components/badge';
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
import { useCartStore } from '@/stores/cart-store';
import { useWhitelistStore } from '@/stores/whitelist-store';

import { navItems } from '../navigation/menu';
import { ROUTER } from '../navigation/router';

export const Header = () => {
  const navigate = useRouter();
  const path = usePathname();
  const isHome = path === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cartItems } = useCartStore();
  const { whitelistItems } = useWhitelistStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-[9999] transition-colors duration-300 shadow-md',
        isScrolled || !isHome ? 'bg-white' : 'bg-black/65  backdrop-blur-md',
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-3xl font-bold cursor-pointer font-noto text-primary',
            )}
            onClick={() => navigate.push(ROUTER.HOME)}
          >
            e-com
          </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item, index) => (
                <NavigationMenuItem key={`${item.title}-${item.href}-${index}`}>
                  {item.hasSubMenu ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          'bg-transparent hover:bg-transparent font-medium font-noto text-sm hover:text-primary',
                          isScrolled || !isHome
                            ? 'text-gray-700'
                            : 'text-white bg-transparent hover:bg-transparent',
                        )}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] font-medium font-noto text-sm">
                          {item.subMenu?.map((subItem, subIndex) => (
                            <Item
                              key={`${subItem.title}-${subItem.href}-${subIndex}`}
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
                            'bg-transparent hover:bg-transparent font-medium font-noto text-sm hover:text-primary',
                            isScrolled || !isHome
                              ? 'text-gray-700'
                              : 'text-white hover:bg-transparent',
                          )}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    )
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex space-x-6">
          {navItems.map(
            (item, index) =>
              item.ariaLabel && (
                <Link
                  key={`${item.ariaLabel}-${item.to}-${index}`}
                  className={cn(
                    'hover:bg-transparent font-medium font-noto hover:text-primary hidden md:block',
                    isScrolled || !isHome
                      ? 'text-gray-700'
                      : 'text-white hover:text-white',
                  )}
                  href={item.to || ''}
                >
                  <Badge
                    count={
                      item.ariaLabel === 'Wishlist'
                        ? whitelistItems.length
                        : item.ariaLabel === 'Cart'
                        ? cartItems.length
                        : 0
                    }
                    className={cn(
                      'bg-red-600 w-5 h-5 rounded-full flex items-center justify-center -top-2 -right-2',
                    )}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                  </Badge>
                </Link>
              ),
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            className={cn(
              'block md:hidden',
              isScrolled || !isHome ? 'text-gray-700' : 'text-white',
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

      {/** Mobile Menu **/}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black bg-opacity-50 md:hidden">
          <div className="fixed right-0 top-0 h-full w-full bg-white shadow-lg">
            <div className="flex items-center p-6 justify-between">
              <h4
                className={cn('text-3xl font-bold cursor-pointer font-noto')}
                onClick={() => navigate.push(ROUTER.HOME)}
              >
                e-com
              </h4>
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
                {navItems.map((item, index) => (
                  <NavigationMenuItem
                    key={`${item.title}-${item.href}-${index}`}
                  >
                    {item.hasSubMenu ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            'bg-transparent hover:bg-transparent font-medium font-noto text-sm',
                            isScrolled || !isHome
                              ? 'text-gray-700'
                              : 'text-white',
                          )}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-6">
                            {item.subMenu?.map((subItem, subIndex) => (
                              <Item
                                key={`${subItem.title}-${subItem.href}-${subIndex}`}
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
                              'bg-transparent hover:bg-transparent font-medium font-noto text-sm',
                              isScrolled || !isHome
                                ? 'text-gray-700'
                                : 'text-black',
                            )}
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      )
                    )}
                  </NavigationMenuItem>
                ))}
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
          <Link
            ref={ref}
            href={href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <p className="text-sm font-medium font-noto leading-none">
              {title}
            </p>
            {description && (
              <p className="line-clamp-2 text-sm font-noto leading-snug text-muted-foreground">
                {description}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);

Item.displayName = 'Item';
