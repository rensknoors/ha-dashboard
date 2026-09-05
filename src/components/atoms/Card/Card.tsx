import { clsx } from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type CardVariant = 'surface' | 'panel';

export type CardProps = {
  children?: ReactNode;
  /** 'surface' (default): the charcoal bento tile used everywhere.
   *  'panel': the one warm, light contrast surface — use sparingly, at most
   *  once per screen, for the view's single "hero" card. */
  variant?: CardVariant;
  onClick?: () => void;
  onLongPress?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const variantClasses: Record<CardVariant, string> = {
  surface: 'bento-card',
  panel: 'bento-panel',
};

const Card = ({
  children,
  className,
  style,
  variant = 'surface',
  onClick,
  onLongPress,
}: CardProps) => {
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const startPressTimer = () => {
    setLongPressTriggered(false);
    if (onLongPress) {
      pressTimer.current = setTimeout(() => {
        onLongPress();
        setLongPressTriggered(true);
      }, 1000);
    }
  };

  const stopPressTimer = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleClick = () => {
    if (!longPressTriggered && onClick) {
      onClick();
    }
  };

  useEffect(() => {
    return () => stopPressTimer(); // Clear any remaining timers on component unmount
  }, []);

  return (
    <div
      className={twMerge(
        clsx(
          'overflow-hidden px-6 py-6',
          variantClasses[variant],
          onClick && 'card-interactive'
        ),
        className
      )}
      style={style}
      onClick={handleClick}
      onMouseDown={startPressTimer}
      onMouseUp={stopPressTimer}
      onMouseLeave={stopPressTimer} // Stop timer if mouse leaves element
      onTouchStart={startPressTimer}
      onTouchEnd={stopPressTimer}
    >
      {children}
    </div>
  );
};

export { Card };
