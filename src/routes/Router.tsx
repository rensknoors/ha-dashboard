import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/routes/ErrorPage/ErrorPage';

import { Home } from './Home/Home';
import { Media } from './Media/Media';
import { Root } from './Root';
import { Vacuum } from './Vacuum/Vacuum';
import { Weather } from './Weather/Weather';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/vacuum',
        element: <Vacuum />,
      },
      {
        path: '/weather',
        element: <Weather />,
      },
      {
        path: '/media',
        element: <Media />,
      },
      {
        path: '/settings',
        element: <div>Settings</div>,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export { Router };
