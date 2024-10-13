import React from 'react';

import AddIcon from '@mui/icons-material/Add';
// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export const MenuItemLayout = ({
  menu,
  handleMenuModalOpen,
  updateCartDetails,
  isLastItem = false,
  isLoading,
  isFetching,
}) => {
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
          {isLoading || isFetching ? (
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
          {isLoading || isFetching ? (
            <Skeleton variant="text" width="40%" height={24} />
          ) : (
            <Typography variant="body1" color="text.primary" fontWeight="bold">
              ${menu?.itemPrice}
            </Typography>
          )}
        </Stack>
        {isLoading || isFetching ? (
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
          {isLoading || isFetching ? (
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
                  <IconButton onClick={() => handleMenuModalOpen({ menu })}>
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
                  <IconButton onClick={() => handleMenuModalOpen({ menu })}>
                    <AddIcon
                      sx={{
                        color: (theme) => theme.palette.success.main,
                      }}
                    />
                  </IconButton>
                </>
              ) : isLoading || isFetching ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={38}
                  sx={{ borderRadius: 3 }}
                />
              ) : (
                <Button
                  fullWidth
                  onClick={() => handleMenuModalOpen({ menu })}
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
