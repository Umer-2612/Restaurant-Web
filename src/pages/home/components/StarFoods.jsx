import React from 'react';

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MenuItemLayout } from 'components/common/CommonComponents';
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
          {menuItems?.map((menu, index) => {
            return <MenuItemLayout key={menu?.title} menu={menu} />;
          })}
        </Grid>
      </Stack>
    </Grid>
  );
};

export default StarFoods;
