import React from 'react';

// import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Outlet } from 'react-router-dom';

dayjs.extend(duration);

export default function AuthLayout() {
  return (
    <Box maxHeight="100vh">
      <Stack gap={3}>
        <Outlet />
      </Stack>
    </Box>
  );
}
