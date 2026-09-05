import { WiDirectionUp } from 'react-icons/wi';

export const getWindDirectionIcon = (
  direction: number,
  className = 'h-12 w-12 text-mist-muted'
) => {
  return (
    <WiDirectionUp
      className={className}
      style={{ transform: `rotate(${direction}deg)` }}
    />
  );
};
