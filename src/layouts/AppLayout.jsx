import React from 'react';

// import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Outlet } from 'react-router-dom';

import Navbar from 'components/navbar/Navbar';

dayjs.extend(duration);

export default function AppLayout() {
  // const isWideScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Box maxHeight="100vh">
      <Stack>
        <Navbar />
      </Stack>
      <Grid
        sx={{
          display: { xs: 'flex' },
          transition: (theme) =>
            theme.transitions.create(['margin-left', 'left'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          // py: 2,
        }}
        container
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
