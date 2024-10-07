import React, { useEffect, useState } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import './ProductCarousel.css'; // Import custom CSS for styling

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
      <div className="carousel-wrapper">
        <Typography
          variant="h3"
          sx={{ color: 'red', fontWeight: 'bold' }}
          textAlign={'left'}
        >
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
            <img
              src="https://punjabitouchindianrestaurant.com.au/wp-content/uploads/2023/10/Dal-Makhani-New-3-1568x1046.jpg"
              alt="Product 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://punjabitouchindianrestaurant.com.au/wp-content/uploads/2023/10/one-pan-paneer-and-spinach-tikka-masala-150801-1-1568x1045.webp"
              alt="Product 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://punjabitouchindianrestaurant.com.au/wp-content/uploads/2023/10/butter-chicken-with-raita-161685-1.jpg"
              alt="Product 3"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://punjabitouchindianrestaurant.com.au/wp-content/uploads/2023/10/Dal-Makhani-New-3-1568x1046.jpg"
              alt="Product 4"
            />
          </div>
        </Carousel>
      </div>
    </Container>
  );
};

export default ProductCarousel;
