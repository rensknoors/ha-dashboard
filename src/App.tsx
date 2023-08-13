import { HassConnect } from '@hakit/core';
import { SideBar } from '@/components/layout/Sidebar/Sidebar';
import { Content } from '@/components/layout/Content/Content';

const App = () => {
  const HASS_URL = import.meta.env.VITE_HASS_URL;

  return (
    <HassConnect hassUrl={HASS_URL}>
      <div className="flex h-[800px] max-h-screen w-screen justify-center p-6">
        <SideBar />
        <Content />
      </div>
    </HassConnect>
  );
};

export default App;
