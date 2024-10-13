import React, { lazy, Suspense, useMemo } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { Navigate, useRoutes } from 'react-router-dom';

// import config from 'config';
import ScrollToTop from 'components/common/ScrollToTop';
import { AuthProvider, AuthRedirect } from 'context/AuthContext';
import AuthLayout from 'layouts/AuthLayout';
import SignIn from 'pages/auth/SignIn';
import useAuth from 'utils/authUtils';

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

// Routing
const AdminRouting = lazy(() => import('pages/admin/AdminRouting'));

export default function AppRouting() {
  const auth = useAuth();
  const defaultNavigate = useMemo(() => {
    if (auth?.authenticated) {
      return '/admin/orders';
    }
    return '/home';
  }, [auth?.authenticated]);

  const getRouteWrapper = (component, authRoute = true) => {
    return (
      <AuthRedirect authenticatedRoute={authRoute}>
        <Suspense
          fallback={
            <Stack
              width="100%"
              height="100vh"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Stack>
          }
        >
          {component}
        </Suspense>
      </AuthRedirect>
    );
  };

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
      path: '/admin',
      // element: getRouteWrapper(<AuthLayout />, false),
      children: [
        {
          path: '/admin/sign-in',
          element: getRouteWrapper(<SignIn />, false),
        },
        {
          path: '/admin',
          element: getRouteWrapper(<AuthLayout />),
          children: [
            {
              index: true,
              path: '*',
              element: getRouteWrapper(<AdminRouting />),
            },
          ],
        },
        {
          index: true,
          element: <Navigate to={'/admin/sign-in'} />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={defaultNavigate} />,
    },
  ];
  const routing = useRoutes(routes);

  return (
    <AuthProvider>
      <>
        <ScrollToTop />
        {routing}
      </>
    </AuthProvider>
  );
}
