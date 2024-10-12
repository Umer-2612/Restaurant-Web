import styled from '@emotion/styled';
import { Box } from '@mui/material';

import backGroundImage from 'assets/images/banner_image.png';

export const Banner = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: theme.spacing(20),
  // backgroundImage:
  //   'url(https://punjabitouchindianrestaurant.com.au/wp-content/uploads/2023/10/facebook_cover_513.png)',
  backgroundImage: `url(${backGroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10), // Reduce padding on medium and small screens
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(5), // Further reduce padding on small screens
  },
}));
