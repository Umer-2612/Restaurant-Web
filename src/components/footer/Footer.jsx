import React from 'react';

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import PTFullLogo from './../../../src/assets/brand-image/punjabi-touch-cropped.png';

import { TABS } from 'utils/commonData';

const Footer = () => {
  return (
    <Grid
      container
      minHeight={300}
      bgcolor={(theme) => theme.palette.other.mutedBlack}
      justifyContent="center"
      px={2}
      py={4}
    >
      <Grid size={{ xs: 12, sm: 11, md: 10 }}>
        <Stack
          direction="row"
          gap={4}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack maxWidth={350} gap={2}>
            <Stack bgcolor="white" width="fit-content" p={2} borderRadius={3}>
              <img
                src={PTFullLogo}
                alt="Punjabi Touch logo"
                height="100%"
                width="100%"
                style={{
                  aspectRatio: '789 / 241',
                }}
                aria-label="Punjabi Touch Logo"
              />
            </Stack>
            <Typography variant="body4" color="white">
              We serve more than 100 varieties of Punjabi Indian cuisine that
              will satiate your taste buds and keep you closer to the tradition
              and food.
            </Typography>
          </Stack>
          <Stack color="white">
            <Typography variant="subtitle2" fontWeight={600}>
              Quick Links
            </Typography>
            <List>
              {TABS?.map((tab) => (
                <ListItem key={tab?.title} disablePadding>
                  <Link
                    to={tab?.path}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                    }}
                  >
                    <ListItemText primary={tab?.title} color="white" />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack gap={2} color="white">
            <Typography variant="subtitle2" fontWeight={600}>
              CATERING BOOKING
            </Typography>
            <Button variant="contained" sx={{ borderRadius: 2 }}>
              BOOK YOUR EVENT
            </Button>
            <Typography variant="subtitle2" fontWeight={600}>
              MAKE A RESERVATION
            </Typography>
            <Button variant="contained" sx={{ borderRadius: 2 }}>
              BOOK ONLINE
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Footer;
