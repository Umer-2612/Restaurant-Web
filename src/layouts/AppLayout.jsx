import React, { useEffect } from 'react';

// import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import { modifyCartDetails } from 'store/slices/cart';

dayjs.extend(duration);

export default function AppLayout() {
  // const isWideScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart details from localStorage once when the component mounts
    const loadCartDetails = () => {
      try {
        const storedMenuDetails =
          JSON.parse(localStorage.getItem('menuDetails')) || [];
        if (storedMenuDetails.length > 0) {
          dispatch(modifyCartDetails(storedMenuDetails));
        }
      } catch (error) {
        console.error('Error parsing menu details from localStorage', error);
      }
    };

    loadCartDetails();
  }, [dispatch]);

  return (
    <Box minHeight="100vh">
      <Navbar />
      <Stack gap={20}>
        <Outlet />
        <Footer />
      </Stack>
    </Box>
  );
}
