import { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type CardProps = {
  children?: ReactNode;
  onClick?: () => void;
  onLongPress?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({
  children,
  className,
  style,
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
        'overflow-hidden rounded-3xl bg-slate-800 px-4 py-4',
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
