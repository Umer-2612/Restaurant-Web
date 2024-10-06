import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Outlet } from 'react-router-dom';

import SideBar from 'components/sidebar/Sidebar';

dayjs.extend(duration);

export default function AuthLayout() {
  return (
    <Box maxHeight="100vh">
      <SideBar />
      <Stack
        p={4}
        gap={3}
        sx={{
          transition: (theme) =>
            theme.transitions.create(['margin-left', 'left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ml: '260px',
        }}
      >
        <Outlet />
      </Stack>
    </Box>
  );
}
