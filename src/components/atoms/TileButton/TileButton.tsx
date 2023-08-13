import { useIcon } from '@hakit/core';

export type TileButtonProps = {
  path: string;
  name: string;
  icon: string;
  color: string;
};

const TileButton = ({ icon, name, path, color }: TileButtonProps) => {
  const svg = useIcon(icon);
  return (
    <div
      className={`${color} m-2 flex aspect-square w-16 place-content-center place-items-center rounded-3xl text-black`}
    >
      {svg}
    </div>
  );
};

export { TileButton };
