import React, { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { loadStripe } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import CustomForm from './CustomForm';

import EmptyCartImage from 'assets/images/barbecue.svg';
import RHFButton from 'components/button/RHFButton';
import { useCreateCheckoutSessionMutation } from 'store/apis/checkoutApi';
import { cartSelector, modifyCartDetails } from 'store/slices/cart';
import { validationSchema } from 'utils/validation'; // Your custom validation rules

// Validation schema
const CUSTOM_FORM_VALIDATION = Yup.object().shape({
  firstName: validationSchema.firstName,
  lastName: validationSchema.lastName,
  phoneNo: validationSchema.phoneNo,
  email: validationSchema.email,
});

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const navigate = useNavigate();
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();
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

  // Initialize form handling with validation
  const { control, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(CUSTOM_FORM_VALIDATION),
  });

  return (
    <Stack
      sx={{ bgcolor: (theme) => theme.palette.other.bgColor }}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Container sx={{ mt: 4, mb: 4 }}>
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center' }}>
            <EmptyCartImage
              style={{
                width: '250px',
                height: '350px',
              }}
            />
            <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
              Your cart is empty!
            </Typography>
            <Button
              variant="contained"
              color="error"
              size="large"
              onClick={() => navigate('/menu')}
              sx={{ '&:hover': { backgroundColor: '#c62828' } }}
            >
              Go to Menu
            </Button>
          </Box>
        ) : (
          <Grid
            component="form"
            onSubmit={handleSubmit(handleCheckout)}
            container
            spacing={6}
          >
            <Grid item size={{ xs: 12, md: 7 }}>
              <Card
                elevation={0}
                sx={{
                  p: 6,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  Enter Your Details
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <CustomForm
                  handleCheckout={handleCheckout}
                  control={control}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </Card>
            </Grid>
            <Grid item size={{ xs: 12, md: 5 }}>
              <Stack gap={3}>
                <Stack bgcolor={(theme) => theme.palette.background.paper}>
                  <Card
                    elevation={0}
                    sx={{
                      px: 6,
                      pt: 6,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      Your Cart Items
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack
                      gap={2}
                      sx={{ maxHeight: '400px', overflowY: 'auto' }}
                    >
                      {cartItems.map((item) => (
                        <Paper
                          key={item.menuId}
                          elevation={0}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '10px',
                            transition: '0.3s',
                            gap: 2,
                          }}
                        >
                          <Stack minWidth="55%" overflow="hidden">
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 600 }}
                              color="text.primary"
                            >
                              {item?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item?.categoryName}
                            </Typography>
                          </Stack>
                          <Box
                            sx={{
                              boxShadow:
                                'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <IconButton
                              onClick={() =>
                                updateQuantity(item?.menuId, false)
                              }
                            >
                              <RemoveIcon
                                sx={{
                                  color: (theme) => theme.palette.success.main,
                                }}
                              />
                            </IconButton>
                            <Typography
                              variant="body1"
                              color="success.main"
                              fontWeight={600}
                            >
                              {item?.quantity}
                            </Typography>
                            <IconButton
                              onClick={() => updateQuantity(item?.menuId, true)}
                            >
                              <AddIcon
                                sx={{
                                  color: (theme) => theme.palette.success.main,
                                }}
                              />
                            </IconButton>
                          </Box>
                          <Stack
                            sx={{
                              flexGrow: 1,
                              justifyContent: 'center',
                              alignItems: 'end',
                              mr: 1,
                            }}
                          >
                            <Typography variant="body3">
                              ${(item?.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Stack>
                        </Paper>
                      ))}
                    </Stack>
                  </Card>
                  <Stack px={4} py={2} pb={4}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      bgcolor={(theme) => theme.palette.other.bgColor}
                      p={2}
                    >
                      <Typography variant="body1">
                        Total Items: <strong>{totalQuantity}</strong>
                      </Typography>
                      <Typography variant="body1">
                        Total Price:{' '}
                        <strong style={{ color: '#ff5722' }}>
                          ${totalPrice?.toFixed(2)}
                        </strong>
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <RHFButton
                  isLoading={isLoading}
                  variant="outlined"
                  color="primary"
                  type="submit"
                  title="Proceed to Payment"
                />
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </Stack>
  );
};

export default Cart;
