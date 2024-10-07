import React from 'react';

import styled from '@emotion/styled';
import {
  Box,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { LIGHT } from 'store/theme/colors';

const theme = createTheme({
  palette: LIGHT,
});

const FlavourOfIndia = () => {
  const Content = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  }));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={4}>
            <img
              src="https://punjabitouchindianrestaurant.com.au/wp-content/uploads/2023/10/tandoori_paneer_tikka_restaurant_style-1024x1024.jpg"
              alt="Punjabi food"
              style={{
                width: '100%',
                height: 'auto', // Ensure the image scales properly
                borderRadius: '40px',
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Content>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontFamily: 'Poppins Sans-serif',
                  fontWeight: '600',
                  fontSize: isSmallScreen ? '1.75rem' : '2.5rem', // Adjust font size for smaller screens
                }}
              >
                Relish The Flavours Of India With Us!
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                We are one of the best places for food chronicles, offering an
                endless maze of lip-smacking foods. Our restaurant will lure
                your heart and taste buds with heart-warming aromatic foods.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Are you willing to experience the best quality food? We welcome
                all the foodies to experience our drooling food and
                heart-warming customers. You can consider us as the best
                restaurant near you to slurp drinks with friends for an evening
                hangout!
              </Typography>

              <Typography variant="body1" color="textSecondary">
                Bring the lover of your life here and romanticize your date with
                our lip-smacking foods. Book your table now in advance to get
                rid of any hassle.
              </Typography>
            </Content>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default FlavourOfIndia;
