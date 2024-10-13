import styled from '@emotion/styled';
import { Box } from '@mui/material';

import backGroundImage from 'assets/images/bgimage.jpeg';

export const Banner = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  textAlign: 'center',
  maxWidth: '100%',
  backgroundImage: `url(${backGroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '15 / 4',
  [theme.breakpoints.down('md')]: {
    aspectRatio: '12 / 3',
  },
  [theme.breakpoints.down('sm')]: {
    aspectRatio: '4 / 3',
  },
}));
