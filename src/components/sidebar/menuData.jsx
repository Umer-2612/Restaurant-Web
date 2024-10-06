// eslint-disable-next-line check-file/filename-naming-convention
import React from 'react';

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const menuData = [
  {
    key: 'dashboard',
    title: 'Orders',
    path: '/admin/orders',
    icon: <DeliveryDiningIcon />,
  },
  {
    key: 'reservation',
    title: 'Reservation',
    path: '/admin/reservations',
    icon: <EventAvailableIcon />,
  },
  {
    key: 'queries',
    title: 'Queries',
    path: '/admin/queries',
    icon: <SupportAgentIcon />,
  },
];
