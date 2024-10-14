import React from 'react';

import Stack from '@mui/material/Stack';

// import FlavourOfIndia from './components/FlavourOfIndia';
import HeroSection from './components/HeroSection';
// import ProductCarousel from './components/ProductCarousel';
import StarFoods from './components/StarFoods';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import ValueForMoney from './components/ValueForMoney';

const Home = () => {
  return (
    <Stack gap={5}>
      <HeroSection />
      <StarFoods />
      <ValueForMoney />
      {/* <ProductCarousel /> */}
      <TestimonialsCarousel />
      {/* <FlavourOfIndia /> */}
    </Stack>
  );
};

export default Home;
