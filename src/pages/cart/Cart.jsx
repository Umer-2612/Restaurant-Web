import React, { useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
  Paper,
  Container,
  Button,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomForm from './CustomForm'; // Reusable form component

import EmptyCartImage from 'assets/images/barbecue.svg';
import { useCreateCheckoutSessionMutation } from 'store/apis/checkoutApi';
import { cartSelector, modifyCartDetails } from 'store/slices/cart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const navigate = useNavigate();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector) || [];

  useEffect(() => {
    const storedCartItems =
      JSON.parse(localStorage.getItem('menuDetails')) || [];
    dispatch(modifyCartDetails(storedCartItems));
  }, [dispatch]);

  const updateQuantity = (menuId, increment) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item?.menuId === menuId) {
          const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity === 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item !== null);

    localStorage.setItem('menuDetails', JSON.stringify(updatedItems));
    dispatch(modifyCartDetails(updatedItems));
  };

  const removeItem = (menuId) => {
    const updatedItems = cartItems.filter((item) => item.menuId !== menuId);
    localStorage.setItem('menuDetails', JSON.stringify(updatedItems));
    dispatch(modifyCartDetails(updatedItems));
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item?.price * item.quantity,
    0
  );

  const handleCheckout = async (formData) => {
    const stripe = await stripePromise;

    const payload = {
      user: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNo: formData.phoneNo,
        email: formData.email,
      },
      items: cartItems.map((item) => ({
        menuId: item.menuId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imagePath: item.imagePath,
      })),
      totalPrice: totalPrice,
    };

    const { data: session } = await createCheckoutSession(payload);
    await stripe.redirectToCheckout({ sessionId: session?.sessionId });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Shopping Cart
        </Typography>

        {/* Display empty cart message */}
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <EmptyCartImage style={{ width: '300px', marginBottom: '20px' }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your cart is empty!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/menu')}
            >
              Go to Menu
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items Section */}
            <Grid item xs={12}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  mb: 3,
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Your Cart Items
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    'maxHeight': 150,
                    'overflowY': 'auto',
                    'pr': 2,
                    '&::-webkit-scrollbar': { width: 8 },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#d3d3d3',
                      borderRadius: '4px',
                    },
                  }}
                >
                  {cartItems.map((item) => (
                    <Paper
                      key={item.menuId}
                      elevation={0}
                      sx={{
                        display: 'flex',
                        p: 2,
                        mb: 2,
                        alignItems: 'center',
                        borderRadius: 2,
                        borderBottom: '1px solid',
                        borderColor: 'grey.200',
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: 90,
                          height: 90,
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                        image={item?.imagePath}
                        alt={item?.itemName}
                      />
                      <Box sx={{ flex: 1, ml: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {item?.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item?.categoryName}
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'red' }}>
                          ${item?.price}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          onClick={() => updateQuantity(item?.menuId, false)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ mx: 1 }}>
                          {item?.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => updateQuantity(item?.menuId, true)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" sx={{ ml: 2 }}>
                        ${(item?.price * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton
                        color="error"
                        sx={{ ml: 2 }}
                        onClick={() => removeItem(item?.menuId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              </Card>
            </Grid>

            {/* Form and Order Summary Section */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <CardContent>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Total Items: <strong>{totalQuantity}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Total Price:{' '}
                    <strong style={{ color: 'red' }}>
                      ${totalPrice?.toFixed(2)}
                    </strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Enter Your Details
                </Typography>
                <CustomForm handleCheckout={handleCheckout} />
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
