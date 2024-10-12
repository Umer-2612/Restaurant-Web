import React from 'react';

import { useTheme } from '@emotion/react';
import { Container, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

import butterChicken from 'assets/images/butter.webp';
import tandooriPaneerTikka from 'assets/images/tandoori_paneer_tikka_restaurant_style.jpg';
import { Banner } from 'components/common/Banner';

const Content = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.sectionBackground.main,
  padding: theme.spacing(4),
  textAlign: 'center',
  color: '#000',
  width: '100%',
}));

const SectionContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const AboutUs = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Banner />
      {/* Section 1 */}
      <Container>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={8}>
            <Content>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontFamily: 'Poppins Sans-serif',
                  fontWeight: '600',
                  fontSize: isSmallScreen ? '1.75rem' : '2.5rem', // Adjust font size for smaller screens
                }}
              >
                Enjoy The Desi-Themed Ambiance in Punjabi Touched Indian
                Restaurant
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                We serve more than 100 varieties of Punjabi Indian cuisine that
                will satiate your taste buds and keep you closer to the
                tradition and food. We serve the speciality cuisine from the
                roots of Punjab.
              </Typography>
              <Typography variant="body1" color="textSecondary">
                You can’t resist yourself to test every best food mentioned on
                our menu. By serving the good food, we reached the billions of
                hearts. Try our bestseller delicious foods like Dal Makhani,
                Butter Chicken & Tandoori Chicken.
              </Typography>
            </Content>
          </Grid>
          <Grid item xs={12} md={4}>
            <img
              src={butterChicken}
              alt="Punjabi food"
              style={{
                width: '100%',
                height: 'auto', // Ensures image scales properly
                borderRadius: '8px',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Section 2 */}
      <SectionContainer mt={2}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: (theme) => theme.palette.primary.main,
            fontFamily: 'Poppins Sans-serif',
            fontWeight: '600',
            fontSize: isSmallScreen ? '1.75rem' : '2.5rem', // Adjust font size for smaller screens
          }}
        >
          Discover our Indian food that makes you drool.
        </Typography>
        <SectionContent sx={{ padding: '8px' }}>
          <Typography variant="body1" paragraph textAlign={'justify'}>
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
        </SectionContent>
      </SectionContainer>

      {/* Section 3 */}
      <Container>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={4}>
            <img
              src={tandooriPaneerTikka}
              alt="Punjabi food"
              style={{
                width: '100%',
                height: 'auto', // Ensure the image scales properly
                borderRadius: '8px',
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Content>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  fontFamily: 'Poppins Sans-serif',
                  fontWeight: '600',
                  fontSize: isSmallScreen ? '1.75rem' : '2.5rem', // Adjust font size for smaller screens
                }}
              >
                Experience the richness of flavours with us!
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                The Punjabi Touched Indian Restaurant has come up with
                mouth-watering delicious food items that will satisfy your
                hunger pangs! We promise to complete your meals by serving all
                kinds of Indian dishes.
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Our foods are crafted with the utmost care and detailing so that
                every bite can deliver an explosion of flavour that will
                tantalize your taste buds.
              </Typography>
            </Content>
          </Grid>
        </Grid>
      </Container>

      {/* Section 4 */}
      <SectionContainer
        mt={2}
        sx={{
          background:
            'linear-gradient(180deg, #FFE0B2 0%, #FFF5D7 50%, #FFFFFF 100%)',
          padding: '20px 0',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: (theme) => theme.palette.primary.main,
            fontFamily: 'Poppins Sans-serif',
            fontWeight: '600',
          }}
        >
          Contact us now if you want to experience
          <br />
          hospitality & delicacy
        </Typography>
        <SectionContent sx={{ padding: '8px' }}>
          <Typography variant="body1" paragraph textAlign={'center'}>
            Do you want to taste our delicacy and freshly prepared North India
            Cuisine with your family and friends? Let’s book your table in
            advance!
          </Typography>
        </SectionContent>
      </SectionContainer>
    </>
  );
};

export default AboutUs;
