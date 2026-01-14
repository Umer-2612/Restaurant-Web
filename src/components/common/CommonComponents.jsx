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
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { modifyCartDetails } from 'store/slices/cart';
import useRestaurantStatus from 'store/slices/useRestaurantStatus';

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
  isLastItem = false,
  isLoading,
  isFetching,
  showClosedMessage,
  variantOptions,
  variantGroupKey,
}) => {
  const dispatch = useDispatch();
  const { checkIfOpen } = useRestaurantStatus();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const menuDetails = menu;
  const isVariantItem =
    Array.isArray(variantOptions) && variantOptions?.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [cartDetails, setCartDetails] = useState({
    menuId: menuDetails?._id || null,
    quantity: 0,
    name: menuDetails?.itemName,
    price: menuDetails?.itemPrice,
    categoryName: menuDetails?.category?.name,
    imagePath:
      'https://res.cloudinary.com/domcmqnwn/image/upload/v1728669118/restaurant-menu/u8ry5ckxouqnlgjmykuz.jpg',
    variantGroupKey: variantGroupKey,
  });
  const cartDisabled = false;
  const displayPrice = isVariantItem
    ? selectedVariant?.price
    : menu?.itemPrice;

  useEffect(() => {
    if (!menuDetails) return;

    const fallbackImage =
      'https://res.cloudinary.com/domcmqnwn/image/upload/v1728669118/restaurant-menu/u8ry5ckxouqnlgjmykuz.jpg';

    const defaultVariant =
      isVariantItem && variantOptions?.length > 0
        ? variantOptions?.find(
            (option) =>
              option?.key === menuDetails?.cartDetails?.variantKey ||
              option?.key === menuDetails?.variantDefaultKey
          ) || variantOptions[0]
        : null;

    const baseCartDetails = menuDetails?.cartDetails || {};

    const updatedCartDetails = {
      ...baseCartDetails,
      menuId: isVariantItem ? defaultVariant?.menuId : menuDetails._id,
      quantity: baseCartDetails?.quantity || 0,
      name: isVariantItem
        ? `${menuDetails?.itemName} - ${defaultVariant?.label}`
        : menuDetails?.itemName,
      price: isVariantItem ? defaultVariant?.price : menuDetails?.itemPrice,
      variantKey: isVariantItem ? defaultVariant?.key : undefined,
      variantLabel: isVariantItem ? defaultVariant?.label : undefined,
      cartItemId: isVariantItem
        ? defaultVariant?.menuId
        : baseCartDetails?.cartItemId,
      categoryName: menuDetails?.category?.name,
      imagePath:
        menuDetails?.itemImagePath ||
        baseCartDetails?.imagePath ||
        fallbackImage,
      variantGroupKey: isVariantItem ? variantGroupKey : undefined,
    };

    if (isVariantItem && defaultVariant) {
      setSelectedVariant(defaultVariant);
    }

    setCartDetails(updatedCartDetails);
  }, [isVariantItem, menuDetails, variantOptions]);

  const resolveVariant = (variantKey) => {
    if (!isVariantItem) return null;
    return (
      variantOptions?.find((option) => option?.key === variantKey) ||
      variantOptions?.[0] ||
      selectedVariant
    );
  };

  const buildUpdatedCart = (prevDetails, { quantity, variantKey } = {}) => {
    const variant = isVariantItem ? resolveVariant(variantKey) : null;
    const nextQuantity =
      quantity !== undefined ? quantity : prevDetails?.quantity || 0;
    const cartItemId = isVariantItem
      ? variant?.menuId
      : prevDetails?.cartItemId || menuDetails?._id;

    return {
      ...prevDetails,
      menuId: isVariantItem ? variant?.menuId : menuDetails?._id,
      cartItemId,
      quantity: nextQuantity,
      variantKey: isVariantItem ? variant?.key : undefined,
      variantLabel: isVariantItem ? variant?.label : undefined,
      name: isVariantItem
        ? `${menuDetails?.itemName} - ${variant?.label}`
        : menuDetails?.itemName,
      price: isVariantItem ? variant?.price : menuDetails?.itemPrice,
      categoryName: menuDetails?.category?.name,
      variantGroupKey: isVariantItem ? variantGroupKey : undefined,
    };
  };

  const persistCart = (nextCartDetails) => {
    const storedMenuDetails =
      JSON.parse(localStorage.getItem('menuDetails')) || [];

    const variantMenuIds = isVariantItem
      ? variantOptions?.map((option) => option?.menuId)
      : [];

    const sanitizedMenuDetails =
      isVariantItem && variantGroupKey
        ? storedMenuDetails.filter(
            (menuItem) =>
              menuItem?.variantGroupKey !== variantGroupKey &&
              !variantMenuIds.includes(menuItem?.menuId)
          )
        : storedMenuDetails;

    const targetKey = nextCartDetails?.cartItemId || nextCartDetails?.menuId;
    const itemIndex = sanitizedMenuDetails.findIndex(
      (menuItem) =>
        (menuItem?.cartItemId || menuItem?.menuId) === targetKey
    );

    if (itemIndex >= 0) {
      if (nextCartDetails?.quantity > 0) {
        sanitizedMenuDetails[itemIndex] = nextCartDetails;
      } else {
        sanitizedMenuDetails.splice(itemIndex, 1);
      }
    } else if (nextCartDetails?.quantity > 0) {
      sanitizedMenuDetails.push(nextCartDetails);
    }

    localStorage.setItem(
      'menuDetails',
      JSON.stringify(sanitizedMenuDetails)
    );
    dispatch(modifyCartDetails(sanitizedMenuDetails));
  };

  const updateCartDetails = ({ increaseQuantity }) => {
    setCartDetails((prevDetails) => {
      const newQuantity = increaseQuantity
        ? (prevDetails?.quantity || 0) + 1
        : Math.max(0, (prevDetails?.quantity || 0) - 1);

      const updatedCart = buildUpdatedCart(prevDetails, {
        quantity: newQuantity,
        variantKey: prevDetails?.variantKey,
      });
      persistCart(updatedCart);
      return updatedCart;
    });
  };

  const handleVariantChange = (variantKey) => {
    if (!isVariantItem) return;
    const selected = resolveVariant(variantKey);
    setSelectedVariant(selected);
    setCartDetails((prevDetails) => {
      const updatedCart = buildUpdatedCart(prevDetails, {
        quantity: prevDetails?.quantity || 0,
        variantKey: selected?.key,
      });
      if (updatedCart.quantity > 0) {
        persistCart(updatedCart);
      }
      return updatedCart;
    });
  };

  return (
    <Stack
      overflow="hidden"
      sx={{
        borderBottom: (theme) =>
          isLastItem ? 'none' : `1px solid ${theme.palette.other.border}`,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
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
              $
              {displayPrice !== undefined
                ? Number(displayPrice || 0).toFixed(2)
                : '0.00'}
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
        {isVariantItem && !isLoading && (
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              Select meat/veg:
            </Typography>
            <Select
              size="small"
              value={selectedVariant?.key || variantOptions?.[0]?.key || ''}
              onChange={(event) => handleVariantChange(event.target.value)}
              sx={{
                minWidth: 160,
                backgroundColor: (theme) => theme.palette.other.bgColor,
                borderRadius: 2,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              {variantOptions?.map((option) => (
                <MenuItem key={option?.key} value={option?.key}>
                  {option?.label} - ${Number(option?.price || 0).toFixed(2)}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        )}
      </Stack>
      <Stack
        position="relative"
        sx={{
          height: isMobile ? 200 : 160,
          width: isMobile ? '100%' : 156,
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
            position={isMobile ? 'static' : 'absolute'}
            bottom={isMobile ? 'auto' : menu?.itemImagePath ? 0 : '50%'}
            left={isMobile ? 'auto' : '50%'}
            sx={
              isMobile
                ? { mt: 1 }
                : {
                    transform: menu?.itemImagePath
                      ? 'translate(-50%, 0%)'
                      : 'translate(-50%, 50%)',
                  }
            }
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
              {cartDetails?.quantity ? (
                <>
                  <IconButton
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
                    {cartDetails?.quantity}
                  </Typography>
                  <IconButton
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
                  onClick={() =>
                    updateCartDetails({
                      increaseQuantity: true,
                    })
                  }
                  sx={{
                    'height': 38,
                    'borderRadius': 3,
                    'px': 4,
                    'bgcolor': (theme) => theme.palette.common.white,
                    '&.Mui-disabled': {
                      bgcolor: (theme) =>
                        theme.palette.action.disabledBackground,
                      color: (theme) => theme.palette.action.disabled,
                    },
                  }}
                  disabled={!checkIfOpen() || cartDisabled}
                  variant="text"
                >
                  <Typography
                    variant="subtitle2"
                    color={
                      checkIfOpen() && !cartDisabled
                        ? 'success.main'
                        : 'text.disabled'
                    }
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
  isLastItem: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  showClosedMessage: PropTypes.func,
  variantOptions: PropTypes.array,
  variantGroupKey: PropTypes.string,
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
