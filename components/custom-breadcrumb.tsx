'use client';

import { usePathname } from 'next/navigation';

import React, { Fragment } from 'react';

import { ROUTER } from '@/app/navigation/router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

export const CustomBreadcrumb = () => {
  const pathnames = usePathname()
    .split('/')
    .filter((x) => x);

  const transformPathname = (pathname: string) => {
    return pathname
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={ROUTER.HOME}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const transformedValue = transformPathname(value);

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{transformedValue}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {transformedValue}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
