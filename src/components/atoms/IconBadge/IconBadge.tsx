import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type IconBadgeProps = {
  children: ReactNode;
  size?: number;
} & React.HTMLAttributes<HTMLDivElement>;

/** The recurring circular dark icon holder: every glyph in the system sits
 * inside one of these, one size step lighter than the card it's on. */
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
