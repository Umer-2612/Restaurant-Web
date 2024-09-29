import React from 'react';
import HeroSection from './components/HeroSection';
import Stack from '@mui/material/Stack';
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
