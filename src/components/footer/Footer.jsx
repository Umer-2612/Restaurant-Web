import React from 'react';

import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';

import PTFullLogo from './../../../src/assets/brand-image/punjabi-touch-cropped.png';

import RHFButton from 'components/button/RHFButton';
import { QUERIES, TABS } from 'utils/commonData';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      minHeight={{ xs: 400, md: 300 }}
      bgcolor={(theme) => theme.palette.other.bgColor}
      justifyContent="center"
      px={{ xs: 2, sm: 3 }}
      pt={4}
      pb={2}
    >
      <Grid size={{ xs: 12, sm: 11, lg: 10 }}>
        <Stack gap={2}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            gap={2}
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="flex-start"
          >
            {/* Logo and Description */}
            <Stack
              maxWidth={350}
              gap={2}
              alignItems={{ xs: 'center', md: 'flex-start' }}
            >
              <img
                src={PTFullLogo}
                alt="Punjabi Touch logo"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '789 / 241',
                }}
                aria-label="Punjabi Touch Logo"
              />
              <Typography
                variant="body4"
                color="text.secondary"
                textAlign={{ xs: 'center', md: 'left' }}
              >
                We serve more than 100 varieties of Punjabi Indian cuisine that
                will satiate your taste buds and keep you closer to the
                tradition and food.
              </Typography>
            </Stack>

            {/* Quick Links */}
            <Stack>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.primary"
                mb={1}
              >
                Quick Links
              </Typography>
              <List>
                {TABS?.map((tab) => (
                  <ListItem key={tab?.title} disablePadding>
                    <Link
                      to={tab?.path}
                      style={{
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      <ListItemText
                        primary={tab?.title}
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Stack>

            {/* Queries */}
            <Stack>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.primary"
                mb={1}
              >
                Queries
              </Typography>
              <List>
                {QUERIES?.map((tab) => (
                  <ListItem key={tab?.title} disablePadding>
                    <Link
                      to={tab?.path}
                      style={{
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      <ListItemText
                        primary={tab?.title}
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Stack>

            {/* CTA Buttons */}
            <Stack gap={2} color="text.primary">
              <Typography variant="subtitle2" fontWeight={600}>
                Catering Booking
              </Typography>
              <RHFButton
                variant={'contained'}
                title="Book Your Event"
                onClick={() => navigate('/reservation')}
                size="medium"
              />
              <Typography variant="subtitle2" fontWeight={600}>
                Make a Reservation
              </Typography>
              <RHFButton
                variant={'contained'}
                title="Book Online"
                onClick={() => navigate('/menu')}
                size="medium"
              />
            </Stack>
            {/* Google Map */}
            <Stack width="100%">
              <iframe
                loading="lazy"
                title="Punjabi Touch Indian Restaurant"
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '8px',
                  border: 'none',
                }}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=T2/356%20Middle%20Rd,%20Greenbank%20QLD%204124,%20Australia+(Punjabi%20Touch%20Indian%20Restaurant)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                allowFullScreen
              ></iframe>
            </Stack>
          </Stack>
          <Stack
            p={1}
            borderRadius={3}
            bgcolor={(theme) => theme.palette.background.paper}
            direction="row"
            justifyContent="center"
          >
            <Typography variant="body5" color="text.primary">
              PUNJABI TOUCH INDIAN MULTI CUISINE RESTAURANT 2024 © ALL RIGHTS
              RESERVED
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Footer;
