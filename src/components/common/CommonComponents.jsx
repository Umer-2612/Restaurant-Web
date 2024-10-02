import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { useSearchParams } from 'react-router-dom';

export const MenuItemLayout = ({
  menu,
  handleMenuModalOpen,
  updateCartDetails,
}) => {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
      <Stack
        p={2}
        borderRadius={3}
        sx={{
          'border': (theme) => `2px solid ${theme.palette.other.border}`,
          '&: hover': {
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
          },
        }}
        height="100%"
      >
        <Stack
          sx={{
            width: '100%',
            position: 'relative',
            paddingBottom: '100%',
          }}
        >
          <img
            src={menu?.image || 'https://picsum.photos/200/300'}
            alt={menu?.itemName}
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
            {menu?.itemName}
          </Typography>
          <Typography variant="body2">{menu?.itemDescription}</Typography>
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
                    // onClick={() =>
                    //   updateCartDetails({
                    //     increaseQuantity: false,
                    //   })
                    // }
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
                  sx={{ height: 40 }}
                  variant="contained"
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

export const CustomPagination = ({ limitPerPageArray, total }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page =
    isNaN(Number(searchParams.get('page'))) || searchParams.get('page') <= 0
      ? 1
      : searchParams.get('page');
  const perPage =
    isNaN(Number(searchParams.get('perPage'))) ||
    searchParams.get('perPage') <= 0
      ? 20
      : searchParams.get('perPage');
  const handleChangeRowsPerPage = React.useCallback(
    (newRowsPerPage) => {
      searchParams.set('perPage', newRowsPerPage);
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
            {limitPerPageArray.map((rowPerPage, index) => (
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
