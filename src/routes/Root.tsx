import { Outlet } from 'react-router-dom';

import { SideBar } from '@/components/organisms/Sidebar/Sidebar';

const Root = () => {
  return (
    <div className="flex h-[800px] max-h-screen w-screen justify-center gap-6 p-6">
      <SideBar />
      <div className="flex h-full w-full items-center">
        <Outlet />
      </div>
    </div>
  );
};

export { Root };
