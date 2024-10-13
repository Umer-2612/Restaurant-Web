import styled from '@emotion/styled';
import { Box } from '@mui/material';

import backGroundImage from 'assets/images/banner_image.png';

export const Banner = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  textAlign: 'center',
  height: '300px',
  maxWidth: '100%',
  backgroundImage: `url(${backGroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    height: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '150px',
  },
}));
