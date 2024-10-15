import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';

import { modifyCartDetails } from 'store/slices/cart';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MenuItemModal = ({ menuProps, setMenuProps, handleMenuModalClose }) => {
  const { menuDetails } = menuProps || {};

  const dispatch = useDispatch();
  const [cartDetails, setCartDetails] = useState({
    menuId: menuDetails?._id || null,
    quantity: 1,
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
          quantity: 1,
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
    setCartDetails((prevDetails) => {
      const newQuantity = increaseQuantity
        ? prevDetails.quantity + 1
        : Math.max(0, prevDetails?.quantity - 1);

      return {
        ...prevDetails,
        quantity: newQuantity,
      };
    });
  };

  const handleAddToCart = () => {
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
    handleMenuModalClose();
  };

  return (
    <Dialog
      open={menuProps?.isMenuOpen}
      TransitionComponent={Transition}
      keepMounted
      disableScrollLock
      onClose={handleMenuModalClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        sx: {
          width: 800,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ px: 2 }}>
        <Stack>
          <Typography variant="body2">{menuDetails?.itemName}</Typography>
          <Typography variant="h3">Your customisations</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ px: 2 }}>
        <Stack bgcolor={(theme) => theme.palette.other.bgcolor}>
          <Typography variant="body1">
            {menuDetails?.itemDescription ||
              'There might some description here'}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">
              ${' '}
              {(
                Number(menuDetails?.itemPrice || 1) *
                Number(cartDetails?.quantity || 1)
              ).toFixed(2)}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {cartDetails?.quantity ? (
                <>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      updateCartDetails({
                        increaseQuantity: false,
                      })
                    }
                    disabled={cartDetails?.quantity === 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="subtitle2" color="text.primary">
                    {cartDetails?.quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      updateCartDetails({
                        increaseQuantity: true,
                      })
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </>
              ) : (
                <Button
                  onClick={() =>
                    updateCartDetails({
                      increaseQuantity: true,
                    })
                  }
                  sx={{ height: 40 }}
                  variant="contained"
                >
                  Add
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          sx={{ borderRadius: 2 }}
          onClick={handleAddToCart}
          fullWidth
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuItemModal;

MenuItemModal.propTypes = {
  menuProps: PropTypes.object,
  setMenuProps: PropTypes.func,
  handleMenuModalClose: PropTypes.func,
};
