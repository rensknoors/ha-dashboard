import { RouterProvider, createHashRouter } from 'react-router-dom';
import { ErrorPage } from '@/routes/ErrorPage/ErrorPage';
import { Home } from './Home/Home';
import { Root } from './Root';
import { Vacuum } from './Vacuum/Vacuum';
import { Weather } from './Weather/Weather';
import { Media } from './Media/Media';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/home',
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
  ],
  {
    basename: import.meta.env.DEV ? '/' : '/local/react-dashboard/index.html',
  }
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export { Router };
