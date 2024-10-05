import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { menuItems } from 'utils/data/menuItems';

const MenuItemLayout = ({ menu, handleMenuModalOpen, updateCartDetails }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
      <Stack
        borderRadius={3}
        overflow="hidden"
        height="100%"
        sx={{
          'transition': '0.2s',
          '&: hover': {
            transform: 'scale(1.02)',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          },
        }}
      >
        <Stack
          sx={{
            width: '100%',
            position: 'relative',
            paddingBottom: '50%',
          }}
        >
          <img
            src={menu?.image || 'https://picsum.photos/200/300'}
            alt={menu?.itemName}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Stack>
        <Stack
          p={2}
          gap={0.5}
          sx={{
            border: (theme) => `1px solid ${theme.palette.other.border}`,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700} color="text.primary">
            {menu?.itemName}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {menu?.itemDescription}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {menu?.cartDetails?.quantity ? (
                <>
                  <IconButton
                    color="primary"
                    onClick={() => handleMenuModalOpen({ menu })}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="subtitle2" color="text.primary">
                    {menu?.cartDetails?.quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => handleMenuModalOpen({ menu })}
                  >
                    <AddIcon />
                  </IconButton>
                </>
              ) : (
                <Button
                  onClick={() => handleMenuModalOpen({ menu })}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  Add
                </Button>
              )}
            </Stack>
            <Typography variant="subtitle2" color="primary" fontWeight="bold">
              $ {menu?.itemPrice}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};

MenuItemLayout.propTypes = {
  menu: PropTypes.object,
  handleMenuModalOpen: PropTypes.func,
  cartDetails: PropTypes.object,
  updateCartDetails: PropTypes.func,
};

const StarFoods = () => {
  const navigate = useNavigate();
  return (
    <Grid size={{ xs: 11, md: 10 }}>
      <Stack gap={2}>
        <Typography variant="bh2" fontWeight={600} textAlign="center">
          Our Most Popular{' '}
          <Typography
            variant="h2"
            fontWeight={600}
            component="span"
            color="primary"
          >
            Delicious Food
          </Typography>
        </Typography>
        <Grid container spacing={3}>
          {menuItems?.map((menu, index) => {
            return <MenuItemLayout key={index} menu={menu} />;
          })}
        </Grid>
        <Stack direction="row" justifyContent="center" width="100%">
          <Button
            sx={{ borderRadius: 50, px: 2 }}
            onClick={() => navigate('/menu')}
          >
            View More
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default StarFoods;
