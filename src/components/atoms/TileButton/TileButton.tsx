import { useIcon } from '@hakit/core';
import { Link } from 'react-router-dom';

export interface TileButtonProps {
  path: string;
  name: string;
  icon: string;
  color: string;
}

const TileButton = ({ icon, color, path }: TileButtonProps) => {
  const svg = useIcon(icon);
  return (
    <Link
      to={path}
      className={`${color} m-2 flex aspect-square w-16 place-content-center place-items-center rounded-3xl text-black`}
    >
      {svg}
    </Link>
  );
};

export { TileButton };
