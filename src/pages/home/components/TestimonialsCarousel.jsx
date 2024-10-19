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
    text: "Had an amazing meal at Punjabi Touch! The food was incredibly delicious, some of the best I've ever had. The staff were super friendly and made us feel right at home. The place was spotless, and you could tell they really care about their customers. Highly recommend if you're craving authentic Indian food…🕊️",
    name: 'Sukhman Waraich',
  },
  {
    id: 2,
    text: 'Delicious Lamb Madras curry! Meat was tender and perfect. The meat samosas had a great flavour too. All tasted freshly cooked. Great portions. I asked for a big glass of ice and was not disappointed. Friendly service. I wll be back, Thanks',
    name: 'James',
  },
  {
    id: 3,
    text: 'Presentation, service and food was very delicious and tasty, everything was in a perfect way, really feels like home and taste as well ♥️♥️♥️. Will visit again!!!',
    name: 'Navanjeet Kaur',
  },
  {
    id: 4,
    text: "Had an amazing meal at Punjabi Touch! The food was incredibly delicious, some of the best I've ever had. The staff were super friendly and made us feel right at home. The place was spotless, and you could tell they really care about their customers. Highly recommend if you're craving authentic Indian food…🕊️",
    name: 'Foodista',
  },
  {
    id: 5,
    text: 'Punjabi touch is an absolute gem of an Indian restaurant! From the moment we stepped inside, we were greeted with warmth and hospitality that set the tone for a fantastic dining experience. The ambiance is inviting, with vibrant decor. Now, lets talk about the food simply divine! Each dish bursts with authentic flavors and spices that transport your taste buds straight to India. The service was impeccable, with attentive staff who went above and beyond to ensure your satisfaction.',
    name: 'Gurpreet Kaur',
  },
  {
    id: 6,
    text: 'Superb and authentic food. Taste is just superb. Loved it. They serve all the cuisine Veg and Non veg with amazing menu ,Service is also top notch.Highly recommend when in Brisbane .Keep Shining always #Punjabi Touch ..🔥🔥🤗❤️',
    name: 'Manpreet Kaur',
  },
  {
    id: 7,
    text: 'Delicious curries, we had a lamb madras, butter chicken and a Dahl makhani. All were rich in flavour with whole spices and tender meat. We will be regulars, bonus that they deliver! Highly recommend.',
    name: 'Lucy Schmidt',
  },
  {
    id: 8,
    text: 'Food was extremely delicious as well as surroundings is serene😇.. Moreover staff is friendly and deal with customers in a good way🤟',
    name: 'renuka garg',
  },
  {
    id: 9,
    text: 'Looking for indian take away, this place is where you must go. The best indian take away in Brisbane that I have experience in YEARS. The dishes may not be traditional and may not be cooked in a traditional way. But the food itself is absolutely delicious. Try this place just once and I promise you, you wont regret it',
    name: 'Bethany Rogers',
  },
  {
    id: 10,
    text: 'Punjabi touch restaurant provided a delightful dining experience with its authentic flavours and impeccable service. The ambiance was elegant, and the staff was knowledgeable and attentive. The extensive menu showcased a wide variety of dishes, each prepared with care and expertise. Overall, a highly recommended establishment for those seeking an exceptional Indian culinary experience."',
    name: 'GURJIT SINGH',
  },
];

const TestimonialsCarousel = () => {
  const showArrows = testimonials.length > 1;

  return (
    <Container sx={{ my: 4, padding: { xs: 0, md: '50px' } }}>
      <Carousel
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        autoPlay={testimonials.length > 1}
        interval={3000}
        stopOnHover
        swipeable
        dynamicHeight={true}
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
                transform: 'translate(0, -50%)',
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
              variant="subtitle1"
              sx={{
                fontSize: { xs: '18px', md: '27px' },
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
