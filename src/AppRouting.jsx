import React, { lazy, Suspense } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

const Home = lazy(() => import('pages/home/Home'));

export default function AppRouting() {
  const defaultNavigate = <Navigate to="/home" />;

  const routes = [
    {
      path: '/home',
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: '*',
      element: defaultNavigate,
    },
  ];
  const routing = useRoutes(routes);

  return <>{routing}</>;
}
