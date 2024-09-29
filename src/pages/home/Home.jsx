import React from 'react';

import Stack from '@mui/material/Stack';

import HeroSection from './components/HeroSection';
import StarFoods from './components/StarFoods';

const Home = () => {
  return (
    <Stack>
      <HeroSection />
      <StarFoods />
    </Stack>
  );
};

export default Home;
