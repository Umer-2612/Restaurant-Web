import React, { lazy, Suspense } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

// Layouts
const AppLayout = lazy(() => import('layouts/AppLayout'));

// Components
const Home = lazy(() => import('pages/home/Home'));
const Menu = lazy(() => import('pages/menu/Menu'));
const Reservation = lazy(() => import('pages/reservation/Reservation'));
const AboutUs = lazy(() => import('pages/about-us/AboutUs'));
const ContactUs = lazy(() => import('pages/contact-us/ContactUs'));

export default function AppRouting() {
  const defaultNavigate = <Navigate to="/home" />;

  const routes = [
    {
      path: '/home',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: '/menu',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Menu />,
        },
      ],
    },
    {
      path: '/reservation',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Reservation />,
        },
      ],
    },
    {
      path: '/about-us',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <AboutUs />,
        },
      ],
    },
    {
      path: '/contact-us',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <ContactUs />,
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
