import React from 'react';

// import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Outlet } from 'react-router-dom';

import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';

dayjs.extend(duration);

export default function AppLayout() {
  // const isWideScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Box maxHeight="100vh">
      <Navbar />
      <Stack gap={{ xs: 5, md: 10 }}>
        <Outlet />
        <Footer />
      </Stack>
    </Box>
  );
}
