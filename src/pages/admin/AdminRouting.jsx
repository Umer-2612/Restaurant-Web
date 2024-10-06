import React from 'react';

import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import OrderList from './orders/OrderList';
import QueryList from './queries/QueryList';
import ReservationList from './reservation/ReservationList';

const DefaultNavigate = () => {
  return <Navigate to={'/admin/orders'} />;
};

export default function AdminRouting() {
  const routes = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: 'orders',
          element: <OrderList />,
        },
        {
          path: 'queries',
          element: <QueryList />,
        },
        {
          path: 'reservations',
          element: <ReservationList />,
        },
        {
          path: '*',
          element: <DefaultNavigate />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}
