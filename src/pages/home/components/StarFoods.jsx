import React, { useState } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';

import classsicCurries from 'assets/images/classic_curries.jpg';
import MenuItemModal from 'pages/menu/components/MenuItemModal';
import { useGetCategoriesQuery } from 'store/apis/categories';

const MenuItemLayout = ({ menu, handleMenuModalOpen }) => {
  const navigate = useNavigate();
  return (
    <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
      <Stack
        sx={{
          'position': 'relative',
          'borderRadius': '16px',
          'overflow': 'hidden',
          'cursor': 'pointer',
          '&:hover .menu-image': {
            transform: 'scale(1.1)',
          },
        }}
        onClick={() => navigate(`/menu?category=${menu._id}`)}
      >
        <Box
          sx={{
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0,
            'backgroundColor': 'rgba(0, 0, 0, 0.2)',
            '&: hover': {
              backgroundColor: 'rgba(0, 0, 0, 0)',
            },
            'zIndex': 1,
          }}
        />
        <img
          src={menu?.imagePath ? menu?.imagePath : classsicCurries}
          // src={classsicCurries}
          alt={menu?.name}
          style={{
            width: '100%',
            maxHeight: '180px',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="menu-image"
        />
        <Box
          sx={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            right: '1rem',
            bottom: '1rem',
            border: '3px solid white',
            // zIndex: 3,
          }}
        />
        <Stack
          sx={{
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            transform: 'translateY(-50%)',
            // zIndex: 4,
          }}
        >
          <Typography variant="subtitle1" sx={{ color: '#fff' }}>
            {menu?.name}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
};

MenuItemLayout.propTypes = {
  menu: PropTypes.object.isRequired,
  handleMenuModalOpen: PropTypes.func.isRequired,
};

const StarFoods = () => {
  const [menuProps, setMenuProps] = useState({
    menuDetails: null,
    isMenuOpen: false,
  });
  const navigate = useNavigate();
  const { data } = useGetCategoriesQuery(
    { page: 1, limit: 6, isFav: true },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  let storedMenuDetails = [];
  try {
    storedMenuDetails = JSON.parse(localStorage.getItem('menuDetails')) || [];
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }

  const modifiedData = data?.data?.map((menu) => {
    const itemIndex = storedMenuDetails.findIndex(
      (cartData) => cartData?.menuId === menu?._id
    );
    return itemIndex >= 0
      ? { ...menu, cartDetails: storedMenuDetails[itemIndex] }
      : menu;
  });

  const handleMenuModalOpen = ({ menu }) => {
    setMenuProps({ menuDetails: menu, isMenuOpen: true });
  };

  const handleMenuModalClose = () => {
    setMenuProps({ ...menuProps, isMenuOpen: false });
    setTimeout(() => {
      setMenuProps({ menuDetails: null, isMenuOpen: false });
    }, 200);
  };

  return (
    <Container>
      <Stack gap={4} alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Our Most Popular{' '}
          <Typography
            variant="h4"
            fontWeight="bold"
            component="span"
            color="primary"
          >
            Delicious Food
          </Typography>
        </Typography>
        <Grid container spacing={5}>
          {modifiedData?.map((menu, index) => (
            <MenuItemLayout
              key={index}
              menu={menu}
              handleMenuModalOpen={handleMenuModalOpen}
            />
          ))}
        </Grid>
        <Stack direction="row" justifyContent="center" width="100%">
          <Button
            sx={{ borderRadius: 50, px: 4 }}
            onClick={() => navigate('/menu')}
            variant="outlined"
          >
            View More
          </Button>
        </Stack>
      </Stack>
      <MenuItemModal
        menuProps={menuProps}
        setMenuProps={setMenuProps}
        handleMenuModalClose={handleMenuModalClose}
      />
    </Container>
  );
};

export default StarFoods;
