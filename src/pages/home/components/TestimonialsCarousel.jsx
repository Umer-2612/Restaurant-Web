/* eslint-disable quotes */
import React from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Container, Box, Typography, IconButton } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styles
import './TestimonialsCarousel.css'; // Additional custom styles if necessary
// import BackArrowIcon from './BackArrowIcon.svg';
const testimonials = [
  {
    id: 1,
    text: "Amazing amazing amazing taste, superb ambience. I never spend my money on veg buffet but this time I opted for this one and felt happy. It's very pocket friendly as well. Very good service. From pani puri to soups to starters to main course till sweets everything was super tasty. Will visit this place as many times as I visit Surat. Keep it up.",
    name: 'John Doe',
  },
  {
    id: 2,
    text: 'This is the second testimonial and I loved everything about the service. The food was beyond amazing, and the staff were incredibly helpful!',
    name: 'Jane Smith',
  },
  {
    id: 3,
    text: "I usually don't leave reviews but I was truly impressed by how organized and delightful the restaurant's experience was!I usually don't leave reviews but I was truly impressed by how organized and delightful the restaurant's experience was!I usually don't leave reviews but I was truly impressed.",
    name: 'Samuel Jackson',
  },
  {
    id: 4,
    text: "A hidden gem in Surat! The food is on another level, and I can't recommend it enough. The best dining experience I've had in a long time.I usually don't leave reviews but I was truly impressed by how organized and delightful the restaurant's experience was!",
    name: 'Emily White',
  },
];

const TestimonialsCarousel = () => {
  const showArrows = testimonials.length > 1;

  return (
    <Container sx={{ my: 4, padding: '50px' }}>
      <Carousel
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        autoPlay={testimonials.length > 1}
        interval={3000}
        stopOnHover
        swipeable
        dynamicHeight={false}
        showThumbs={false}
        emulateTouch
        renderArrowPrev={(onClickHandler) =>
          showArrows && (
            <IconButton
              onClick={onClickHandler}
              sx={{ position: 'absolute', left: '10px', top: '50%', zIndex: 2 }}
            >
              <ArrowBackIosNewIcon
                sx={{
                  fontSize: '30px',
                  color: (theme) => theme.palette.other.carouselText,
                }}
              />
            </IconButton>
          )
        }
        renderArrowNext={(onClickHandler) =>
          showArrows && (
            <IconButton
              onClick={onClickHandler}
              sx={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                zIndex: 2,
              }}
            >
              <ArrowForwardIosIcon
                sx={{
                  fontSize: '30px',
                  color: (theme) => theme.palette.other.carouselText,
                }}
              />
            </IconButton>
          )
        }
      >
        {testimonials.map((testimonial) => (
          <Box
            key={testimonial.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              py: 4,
              px: 3,
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: '27px',
                lineHeight: '1.8',
                fontStyle: 'italic',
                color: (theme) => theme.palette.other.carouselText,
                maxWidth: '70%',
                fontWeight: '800',
              }}
            >
              “ {testimonial.text} ”
            </Typography>
            {/* Customer Name */}
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: '15px',
                color: (theme) => theme.palette.other.carouselName,
              }}
            >
              - {testimonial.name}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default TestimonialsCarousel;
