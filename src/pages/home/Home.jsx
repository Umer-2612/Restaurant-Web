import React from 'react';

import Grid from '@mui/material/Grid2';

import HeroSection from './components/HeroSection';
import StarFoods from './components/StarFoods';

const Home = () => {
  return (
    <Grid container gap={{ xs: 5, md: 10 }} justifyContent="center">
      <HeroSection />
      <StarFoods />
    </Grid>
  );
};

export default Home;
