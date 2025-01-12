import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Outlet } from 'react-router-dom';

import SideBar from 'components/sidebar/Sidebar';
// import { printReceipt } from 'utils/printService';
import { sendToPrinter } from 'utils/printService';
import { getSocketInstance } from 'utils/socketUtils';

dayjs.extend(duration);

export default function AuthLayout() {
  useEffect(() => {
    const listener = async (event) => {
      console.log({ event });
      await sendToPrinter(event);
    };

    const socket = getSocketInstance();
    socket?.on('printReceipt', listener);

    return () => {
      socket?.off('printReceipt', listener);
    };
  }, []);

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
