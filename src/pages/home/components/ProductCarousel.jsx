import React, { useEffect, useState } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Stack, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';

import './ProductCarousel.css'; // Import custom CSS for styling
import alooParatha from 'assets/images/Aloo parantha.jpeg';
import daalMakhni from 'assets/images/Daal makhni.jpeg';
import mangoCurry from 'assets/images/Mango curry.jpeg';
import Vindaloo from 'assets/images/Vindaloo.jpeg';
const ProductCarousel = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33); // Default for large screens

  // Adjust centerSlidePercentage based on screen width
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      setCenterSlidePercentage(100); // Show 1 item on small screens
    } else if (screenWidth <= 768) {
      setCenterSlidePercentage(50); // Show 2 items on medium screens
    } else {
      setCenterSlidePercentage(33); // Show 3 items on larger screens
    }
  };

  // Listen for window resize to dynamically adjust slide percentage
  useEffect(() => {
    handleResize(); // Call it initially
    window.addEventListener('resize', handleResize); // Add event listener
    return () => {
      window.removeEventListener('resize', handleResize); // Clean up on unmount
    };
  }, []);
  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="bh2" color="primary">
          PRODUCTS
        </Typography>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          centerMode={true}
          centerSlidePercentage={centerSlidePercentage}
          emulateTouch
          showArrows={false}
          dynamicHeight={false}
          interval={3000}
          transitionTime={500}
          stopOnHover={true}
        >
          <div className="carousel-item">
            <img src={mangoCurry} alt="Product 1" />
          </div>
          <div className="carousel-item">
            <img src={alooParatha} alt="Product 2" />
          </div>
          <div className="carousel-item">
            <img src={Vindaloo} alt="Product 3" />
          </div>
          <div className="carousel-item">
            <img src={daalMakhni} alt="Product 4" />
          </div>
        </Carousel>
      </Stack>
    </Container>
  );
};

export default ProductCarousel;
