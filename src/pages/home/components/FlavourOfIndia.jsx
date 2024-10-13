import React from 'react';

import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import tandooriPaneerTikka from 'assets/images/tandoori_paneer_tikka_restaurant_style.jpg';

const FlavourOfIndia = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const Content = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  }));

  return (
    <Container>
      <Grid container spacing={4} mt={8}>
        <Grid
          item
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <img
            src={tandooriPaneerTikka}
            alt="Punjabi food"
            style={{
              width: '100%',
              height: 'auto', // Ensure the image scales properly
              borderRadius: '40px',
            }}
          />
        </Grid>
        <Grid
          item
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <Content>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontFamily: 'Poppins Sans-serif',
                fontWeight: '600',
                fontSize: isSmallScreen ? '1.75rem' : '2rem', // Adjust font size for smaller screens
              }}
            >
              Relish The Flavours Of India With Us!
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              We are one of the best places for food chronicles, offering an
              endless maze of lip-smacking foods. Our restaurant will lure your
              heart and taste buds with heart-warming aromatic foods.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Are you willing to experience the best quality food? We welcome
              all the foodies to experience our drooling food and heart-warming
              customers. You can consider us as the best restaurant near you to
              slurp drinks with friends for an evening hangout!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Bring the lover of your life here and romanticize your date with
              our lip-smacking foods. Book your table now in advance to get rid
              of any hassle.
            </Typography>
          </Content>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlavourOfIndia;
