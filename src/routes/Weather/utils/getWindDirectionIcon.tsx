import { WiDirectionUp } from 'react-icons/wi';

export const getWindDirectionIcon = (direction: number) => {
  return (
    <WiDirectionUp
      className="mb-2 h-12 w-12 text-gray-500"
      style={{ transform: `rotate(${direction}deg)` }}
    />
  );
};
