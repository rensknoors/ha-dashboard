import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/routes/ErrorPage/ErrorPage';

import { Energy } from './Energy/Energy';
import { Home } from './Home/Home';
import { Root } from './Root';
import { Vacuum } from './Vacuum/Vacuum';
import { Weather } from './Weather/Weather';
import { ROUTES } from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.VACUUM,
        element: <Vacuum />,
      },
      {
        path: ROUTES.WEATHER,
        element: <Weather />,
      },
      {
        path: ROUTES.ENERGY,
        element: <Energy />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export { Router };
