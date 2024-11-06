import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { modifyCartDetails } from 'store/slices/cart';

export const RenderMenuSkeleton = () => {
  return (
    <Stack
      overflow="hidden"
      height="100%"
      direction="row"
      width="100%"
      alignItems="center"
      py={2}
    >
      <Stack
        gap={1}
        sx={{
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="40%" height={24} />
        </Stack>
        <Skeleton variant="text" width="80%" height={20} />
      </Stack>
      <Stack
        position="relative"
        sx={{
          height: 160,
          width: 156,
          borderRadius: 3,
        }}
      >
        <Stack height={144} width={156} borderRadius={3} overflow="hidden">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export const MenuItemLayout = ({
  menu,
  handleMenuModalOpen,
  // updateCartDetails,
  isLastItem = false,
  isLoading,
  isFetching,
}) => {
  const dispatch = useDispatch();
  const menuDetails = menu;
  const [cartDetails, setCartDetails] = useState({
    menuId: menuDetails?._id || null,
    quantity: 0,
    name: menuDetails?.itemName,
    price: menuDetails?.itemPrice,
    // itemImagePath: menuDetails?.itemImagePath,
    categoryName: menuDetails?.category?.name,
    imagePath:
      'https://res.cloudinary.com/domcmqnwn/image/upload/v1728669118/restaurant-menu/u8ry5ckxouqnlgjmykuz.jpg',
  });

  useEffect(() => {
    if (menuDetails) {
      setCartDetails(
        menuDetails?.cartDetails || {
          menuId: menuDetails._id,
          quantity: 0,
          name: menuDetails?.itemName,
          price: menuDetails?.itemPrice,
          // itemImagePath: menuDetails?.itemImagePath,
          categoryName: menuDetails?.category?.name,
          imagePath:
            'https://res.cloudinary.com/domcmqnwn/image/upload/v1728669118/restaurant-menu/u8ry5ckxouqnlgjmykuz.jpg',
        }
      );
    }
  }, [menuDetails]);

  const updateCartDetails = ({ increaseQuantity }) => {
    console.log('in', increaseQuantity);
    let newQuantity = 0;
    setCartDetails((prevDetails) => {
      newQuantity = increaseQuantity
        ? prevDetails.quantity + 1
        : Math.max(0, prevDetails?.quantity - 1);

      return {
        ...prevDetails,
        quantity: newQuantity,
      };
    });
    handleAddToCart({ ...cartDetails, quantity: newQuantity });
  };

  const handleAddToCart = (cartDetails) => {
    const storedMenuDetails =
      JSON.parse(localStorage.getItem('menuDetails')) || [];

    const itemIndex = storedMenuDetails.findIndex(
      (menu) => menu?.menuId === cartDetails?.menuId
    );

    if (itemIndex >= 0) {
      if (cartDetails?.quantity > 0) {
        storedMenuDetails[itemIndex] = cartDetails;
      } else {
        storedMenuDetails[itemIndex] =
          storedMenuDetails[storedMenuDetails?.length - 1];
        storedMenuDetails.pop();
      }
    } else {
      storedMenuDetails.push(cartDetails);
    }

    localStorage.setItem('menuDetails', JSON.stringify(storedMenuDetails));
    dispatch(modifyCartDetails(storedMenuDetails));
  };

  return (
    <Stack
      overflow="hidden"
      height="100%"
      sx={{
        borderBottom: (theme) =>
          isLastItem ? 'none' : `1px solid ${theme.palette.other.border}`,
      }}
      direction="row"
      alignItems="center"
      width="100%"
      py={2}
    >
      <Stack
        gap={1}
        sx={{
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack>
          {isLoading ? (
            <Skeleton variant="text" width="60%" height={28} />
          ) : (
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color="text.primary"
            >
              {menu?.itemName}
            </Typography>
          )}
          {isLoading ? (
            <Skeleton variant="text" width="40%" height={24} />
          ) : (
            <Typography variant="body1" color="text.primary" fontWeight="bold">
              ${menu?.itemPrice}
            </Typography>
          )}
        </Stack>
        {isLoading ? (
          <Skeleton variant="text" width="80%" height={20} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {menu?.itemDescription}
          </Typography>
        )}
      </Stack>
      <Stack
        position="relative"
        sx={{
          height: 160,
          width: 156,
          borderRadius: 3,
        }}
      >
        <Stack height={144} width={156} borderRadius={3} overflow="hidden">
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            menu?.itemImagePath && (
              <img
                src={menu?.itemImagePath || 'https://picsum.photos/200/300'}
                alt={menu?.itemName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )
          )}
        </Stack>
        {!isLoading && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            position="absolute"
            bottom={menu?.itemImagePath ? 0 : '50%'}
            left="50%"
            sx={{
              transform: menu?.itemImagePath
                ? 'translate(-50%, 0%)'
                : 'translate(-50%, 50%)',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              bgcolor={(theme) => theme.palette.common.white}
              borderRadius={3}
              sx={{
                width: 120,
                boxShadow:
                  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
              }}
            >
              {menu?.cartDetails?.quantity ? (
                <>
                  <IconButton
                    // onClick={() => handleMenuModalOpen({ menu })}
                    onClick={() =>
                      updateCartDetails({
                        increaseQuantity: false,
                      })
                    }
                  >
                    <RemoveIcon
                      sx={{
                        color: (theme) => theme.palette.success.main,
                      }}
                    />
                  </IconButton>
                  <Typography
                    variant="subtitle2"
                    color="success.main"
                    fontWeight={600}
                  >
                    {menu?.cartDetails?.quantity}
                  </Typography>
                  <IconButton
                    // onClick={() => handleMenuModalOpen({ menu })}
                    onClick={() =>
                      updateCartDetails({
                        increaseQuantity: true,
                      })
                    }
                  >
                    <AddIcon
                      sx={{
                        color: (theme) => theme.palette.success.main,
                      }}
                    />
                  </IconButton>
                </>
              ) : isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={38}
                  sx={{ borderRadius: 3 }}
                />
              ) : (
                <Button
                  fullWidth
                  // onClick={() => handleMenuModalOpen({ menu })}
                  onClick={() =>
                    updateCartDetails({
                      increaseQuantity: true,
                    })
                  }
                  sx={{
                    height: 38,
                    borderRadius: 3,
                    px: 4,
                    bgcolor: (theme) => theme.palette.common.white,
                  }}
                  variant="text"
                >
                  <Typography
                    variant="subtitle2"
                    color="success.main"
                    fontWeight={600}
                  >
                    ADD
                  </Typography>
                </Button>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

MenuItemLayout.propTypes = {
  menu: PropTypes.object,
  handleMenuModalOpen: PropTypes.func,
  cartDetails: PropTypes.object,
  updateCartDetails: PropTypes.func,
  isLastItem: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
};

export const CustomPagination = ({
  limitPerPageArray = [20, 40, 60, 80],
  total,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page =
    isNaN(Number(searchParams.get('page'))) || searchParams.get('page') <= 0
      ? 1
      : searchParams.get('page');
  const perPage =
    isNaN(Number(searchParams.get('limit'))) || searchParams.get('limit') <= 0
      ? 20
      : searchParams.get('limit');

  const handleChangeRowsPerPage = React.useCallback(
    (newRowsPerPage) => {
      searchParams.set('limit', newRowsPerPage);
      searchParams.set('page', 1);

      setSearchParams(searchParams, { replace: true });
    },
    [setSearchParams, searchParams]
  );
  const handlePageChange = React.useCallback(
    (page) => {
      searchParams.set('page', page);
      setSearchParams(searchParams, { replace: true });
    },
    [setSearchParams, searchParams]
  );

  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems="center"
      direction="row"
      p={2}
      width="100%"
      sx={{
        background: (theme) => theme.palette.background.paper,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }}
    >
      <Grid sm="auto" display="flex" justifyContent="center">
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
            variant="body1"
          >
            Row Per Page
          </Typography>
          <Select
            displayEmpty
            value={perPage}
            onChange={(e) => handleChangeRowsPerPage(e.target.value)}
            input={<OutlinedInput />}
            sx={{
              'height': 32,
              'backgroundColor': (theme) => theme.palette.other.bgColor,
              '.MuiOutlinedInput-notchedOutline': {
                border: 0,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 0,
              },
              '& .MuiSelect-icon': {
                color: (theme) => theme.palette.text.primary,
                transition: '0.2s',
              },
              ':hover .MuiOutlinedInput-notchedOutline': {
                border: 0,
              },
              'borderRadius': 2,
              'overflow': 'hidden',
              'color': (theme) => theme.palette.text.body,
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  marginTop: '10px',
                  backgroundColor: (theme) => theme.palette.background.select,
                  paddingBottom: 0,
                  borderRadius: 2,
                },
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },

              sx: {
                '&& .Mui-selected': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.common.white,
                },

                '.MuiSvgIcon-root ': {
                  fill: (theme) => theme.palette.text.primary,
                },
                'fontSize': '14px',
              },
            }}
            IconComponent={ExpandMoreRoundedIcon}
            size="small"
            renderValue={(selected) => {
              return (
                <Stack direction="row" justifyContent={'center'} gap={1}>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  >
                    {selected}
                  </Typography>
                </Stack>
              );
            }}
          >
            {limitPerPageArray?.map((rowPerPage, index) => (
              <MenuItem
                key={rowPerPage}
                value={rowPerPage}
                sx={(theme) => ({
                  borderBottom:
                    limitPerPageArray.length !== index + 1 &&
                    `1px solid ${theme.palette.other.border}`,
                })}
              >
                {rowPerPage}
              </MenuItem>
            ))}
          </Select>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
            variant="body1"
          >
            {`${Number(page) * Number(perPage) - Number(perPage) + 1}-${
              total <= Number(page) * Number(perPage)
                ? total
                : Number(page) * Number(perPage)
            } of ${total}`}
          </Typography>
        </Stack>
      </Grid>

      <Grid
        mt={{
          xs: 2,
          sm: 0,
        }}
        sm="auto"
        display="flex"
        justifyContent="center"
      >
        <Pagination
          shape="rounded"
          color="primary"
          page={Number(page)}
          count={!total ? 1 : Math.ceil(Number(total) / perPage)}
          sx={{
            '& .MuiPaginationItem-root': {
              'color': (theme) => theme.palette.text.secondary,
              'background': (theme) => theme.palette.other.bgColor,
              '&.Mui-selected': {
                background: (theme) => theme.palette.other.ooc,
                color: (theme) => theme.palette.secondary.contrastText,
              },
              'borderRadius': 1,
              'fontSize': '16px',
              'fontWeight': 600,
              'paddingTop': '3px',
            },
            '.MuiPaginationItem-root.Mui-selected': {
              color: (theme) => theme.palette.common.white,
            },
            '.MuiSvgIcon-root ': {
              fill: (theme) => theme.palette.text.secondary,
            },
            '.MuiPaginationItem-previousNext': {
              color: (theme) => theme.palette.text.secondary,
            },
          }}
          onChange={(e, newPage) => {
            if (Number(page) !== Number(newPage)) {
              handlePageChange(newPage);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

CustomPagination.propTypes = {
  handleChangeRowsPerPage: PropTypes.func,
  handlePageChange: PropTypes.func,
  perPage: PropTypes.number,
  page: PropTypes.number,
  limitPerPageArray: PropTypes.array,
  total: PropTypes.number,
};
