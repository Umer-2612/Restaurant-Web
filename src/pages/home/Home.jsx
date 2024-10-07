import React from 'react';

import Grid from '@mui/material/Grid2';

import FlavourOfIndia from './components/FlavourOfIndia';
import HeroSection from './components/HeroSection';
import ProductCarousel from './components/ProductCarousel';
import StarFoods from './components/StarFoods';
import ValueForMoney from './components/ValueForMoney';

const Home = () => {
  return (
    <Grid container gap={5} justifyContent="center">
      <HeroSection />
      <StarFoods />
      <ValueForMoney />
      <ProductCarousel />
      <FlavourOfIndia />
    </Grid>
  );
};

export default Home;
