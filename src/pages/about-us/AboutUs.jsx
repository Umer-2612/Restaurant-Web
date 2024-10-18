import React from 'react';

import { useTheme } from '@emotion/react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2'; // Import Grid from MUI
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import butterChicken from 'assets/images/butter.webp';
import tandooriPaneerTikka from 'assets/images/tandoori_paneer_tikka_restaurant_style.jpg';
import { Banner, BannerText } from 'components/common/Banner';

const AboutUs = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack gap={20}>
      <Banner>
        <BannerText>About Us</BannerText>
      </Banner>
      {/* Section 1 */}
      <Container>
        <Grid container spacing={4} mt={2}>
          <Grid
            item
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <Stack gap={3} color="text.primary">
              <Typography
                variant="bh3"
                sx={{
                  fontSize: isSmallScreen ? '1.75rem' : '2.5rem',
                }}
              >
                Enjoy The Desi-Themed Ambiance in Punjabi Touched Indian
                Restaurant
              </Typography>
              <Typography variant="body1">
                We serve more than 100 varieties of Punjabi Indian cuisine that
                will satiate your taste buds and keep you closer to the
                tradition and food. We serve the speciality cuisine from the
                roots of Punjab.
              </Typography>
              <Typography variant="body1">
                You can’t resist yourself to test every best food mentioned on
                our menu. By serving the good food, we reached the billions of
                hearts. Try our bestseller delicious foods like Dal Makhani,
                Butter Chicken & Tandoori Chicken.
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <img
              src={butterChicken}
              alt="Punjabi food"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Section 2 */}
      <Container>
        <Stack
          gap={3}
          color="text.primary"
          sx={{
            p: 6,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primaryColor[50]}, ${theme.palette.sectionBackground.main})`,
            borderRadius: 6,
          }}
        >
          <Typography
            variant="bh3"
            sx={{
              fontSize: isSmallScreen ? '1.75rem' : '2.5rem',
            }}
          >
            Discover our Indian food that makes you drool
          </Typography>
          <Typography variant="body1" textAlign={'justify'}>
            Our Punjabi Touched Indian Restaurant is known for its delectable
            Frontier, Punjabi & Lucknawi food. With over 2 decades of journey in
            the hospitality Industry, our brand has made a mark for itself! We
            own multiple awards in this industry, which leaves an everlasting
            impression on one’s mind and heart. With us, you can get the
            holistic experience of Punjabi’s soulful cuisines to the
            village-themed Ambience. This is the perfect place to dine with your
            family and friends. Our dishes are curated with the finest level of
            ingredients, including spices and fresh herbs, with great attention.
            So come to enjoy our Culinary experience that you will treasure for
            life!
          </Typography>
        </Stack>
      </Container>

      {/* Section 3 */}
      <Container>
        <Grid container spacing={4} mt={2}>
          <Grid
            item
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <img
              src={tandooriPaneerTikka}
              alt="Punjabi food"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
          <Grid
            item
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <Stack gap={3} color="text.primary">
              <Typography
                variant="bh3"
                sx={{
                  fontSize: isSmallScreen ? '1.75rem' : '2.5rem',
                }}
              >
                Experience the richness of flavours with us!
              </Typography>
              <Typography variant="body1">
                The Punjabi Touched Indian Restaurant has come up with
                mouth-watering delicious food items that will satisfy your
                hunger pangs! We promise to complete your meals by serving all
                kinds of Indian dishes.
              </Typography>
              <Typography variant="body1">
                Our foods are crafted with the utmost care and detailing so that
                every bite can deliver an explosion of flavour that will
                tantalize your taste buds.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Section 4 */}
      <Container>
        <Stack
          gap={3}
          color="text.primary"
          sx={{
            p: 6,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primaryColor[50]}, ${theme.palette.sectionBackground.main})`,
            borderRadius: 6,
          }}
        >
          <Typography variant="bh3">
            Contact us now if you want to experience
            <br />
            hospitality & delicacy
          </Typography>
          <Typography variant="body1">
            Do you want to taste our delicacy and freshly prepared North India
            Cuisine with your family and friends? Let’s book your table in
            advance!
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
};

export default AboutUs;
