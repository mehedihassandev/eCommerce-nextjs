import { CSSProperties, ReactNode } from 'react';

export interface IContentWrapperProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const ContentWrapper = ({
  children,
  style,
  className,
}: IContentWrapperProps) => {
  return (
    <div
      className={`max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
