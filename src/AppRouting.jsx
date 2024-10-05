import React, { lazy } from 'react';

// import CircularProgress from '@mui/material/CircularProgress';
// import Stack from '@mui/material/Stack';
// import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

// Layouts
const AppLayout = lazy(() => import('layouts/AppLayout'));
const HomeLayout = lazy(() => import('layouts/HomeLayout'));

// Components
const Home = lazy(() => import('pages/home/Home'));
const Menu = lazy(() => import('pages/menu/Menu'));
const Reservation = lazy(() => import('pages/reservation/Reservation'));
const AboutUs = lazy(() => import('pages/about-us/AboutUs'));
const ContactUs = lazy(() => import('pages/contact-us/ContactUs'));
const Cart = lazy(() => import('pages/cart/Cart'));

export default function AppRouting() {
  const defaultNavigate = <Navigate to="/home" />;

  const routes = [
    {
      path: '/home',
      element: <HomeLayout />,
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
      path: '/cart',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Cart />,
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
