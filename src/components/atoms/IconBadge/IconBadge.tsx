import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type IconBadgeProps = {
  children: ReactNode;
  size?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const IconBadge = ({
  children,
  size = 44,
  className,
  style,
  ...rest
}: IconBadgeProps) => (
  <div
    className={twMerge(clsx('icon-badge'), className)}
    style={{ width: size, height: size, ...style }}
    {...rest}
  >
    {children}
  </div>
);

export { IconBadge };
