import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import backGroundImage from 'assets/images/bgimage.jpeg';

export const Banner = styled(Box)(({ theme }) => ({
  'position': 'relative', // Make it the context for absolute positioning
  'backgroundColor': theme.palette.primary.dark,
  'color': theme.palette.common.white,
  'textAlign': 'center',
  'maxWidth': '100%',
  'backgroundImage': `url(${backGroundImage})`,
  'backgroundSize': 'cover',
  'backgroundPosition': 'center',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'aspectRatio': '15 / 4',
  'overflow': 'hidden',

  // Overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    zIndex: 1, // Ensure it sits below the text
  },

  [theme.breakpoints.down('md')]: {
    aspectRatio: '12 / 3',
  },
  [theme.breakpoints.down('sm')]: {
    aspectRatio: '4 / 3',
  },
}));

// Text container to place on top of the overlay
export const BannerText = styled(Typography)(({ theme }) => ({
  position: 'relative', // Ensure it's on top of the overlay
  zIndex: 2, // Make sure it appears above the overlay
  color: theme.palette.common.white,
  fontSize: '3rem',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));
