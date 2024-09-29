import React from 'react';

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { menuItems } from 'utils/data/menuItems';

const StarFoods = () => {
  return (
    <Grid size={{ xs: 12, sm: 11, md: 10 }} px={2}>
      <Stack gap={3}>
        <Typography variant="h3" textAlign="center">
          Our Most Popular{' '}
          <Typography variant="h3" component="span" color="primary">
            Delicious Food
          </Typography>
        </Typography>
        <Grid container spacing={3}>
          {menuItems?.map((item, index) => {
            return (
              <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Stack
                  p={2}
                  borderRadius={3}
                  sx={{
                    'border': (theme) =>
                      `2px solid ${theme.palette.other.border}`,
                    '&: hover': {
                      border: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                    },
                  }}
                >
                  <Stack
                    sx={{
                      width: '100%',
                      position: 'relative',
                      paddingBottom: '100%',
                    }}
                  >
                    <img
                      src={item?.image}
                      alt={item?.name}
                      style={{
                        borderRadius: 12,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Stack>
                  <Stack p={1} gap={1}>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {item?.name}
                    </Typography>
                    <Typography variant="body2">{item?.description}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Grid>
  );
};

export default StarFoods;
