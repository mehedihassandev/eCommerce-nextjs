import React, { FC } from 'react';

import { cn } from '@/lib/utils';

interface IBadgeProps {
  count: number;
  children: React.ReactNode;
  className?: string;
}

export const Badge: FC<IBadgeProps> = ({ count, children, className }) => {
  return (
    <div className="relative inline-block">
      {children}
      {count > 0 && (
        <span
          className={cn(
            'absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold font-noto leading-none text-accent transform translate-x-1/2 -translate-y-1/2',
            className,
          )}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default Badge;
