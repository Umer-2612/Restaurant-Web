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
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { loadStripe } from '@stripe/stripe-js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

import CustomForm from './CustomForm';

import EmptyCartImage from 'assets/images/barbecue.svg';
import RHFButton from 'components/button/RHFButton';
import { useCreateCheckoutSessionMutation } from 'store/apis/checkoutApi';
import { cartSelector, modifyCartDetails } from 'store/slices/cart';
import { validationSchema } from 'utils/validation';

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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('status') && searchParams.get('orderId')) {
      if (searchParams.get('status') === 'success') {
        localStorage.clear('menuDetails');
        dispatch(modifyCartDetails([]));
      }
      navigate(
        `/orderStatus?status=${searchParams.get('status')}&orderId=${searchParams.get('orderId')}`
      );
    }
  }, [dispatch, navigate, searchParams]);

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

  // const totalQuantity = cartItems.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item?.price * item.quantity,
    0
  );

  const handleCheckout = async (formData) => {
    const stripe = await stripePromise;

    const payload = {
      user: {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        phoneNo: formData?.phoneNo,
        email: formData?.email,
      },
      items: cartItems.map((item) => ({
        menuId: item?.menuId,
        name: item?.name,
        price: item?.price,
        quantity: item?.quantity,
        imagePath: item?.imagePath,
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
    <Stack alignItems="center" justifyContent="center" my={15}>
      <Container sx={{ mt: 4, mb: 4 }}>
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center' }}>
            <EmptyCartImage style={{ width: '250px', height: '350px' }} />
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
            <Grid item size={{ xs: 12, md: 5 }}>
              <Card
                elevation={0}
                sx={{
                  p: 6,

                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  Enter Your Details
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <CustomForm
                  handleCheckout={handleCheckout}
                  control={control}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </Card>
            </Grid>
            <Grid item size={{ xs: 12, md: 7 }}>
              <Stack gap={3}>
                <Card
                  elevation={0}
                  sx={{
                    p: 6,
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    Order Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Stack>
                    <TableContainer
                      sx={{
                        maxHeight: '300px',
                        overflowY: 'auto',
                      }}
                    >
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cartItems.map((item) => (
                            <TableRow key={item?.menuId}>
                              <TableCell component="th" scope="row">
                                {item?.name}
                              </TableCell>
                              <TableCell align="center">
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <IconButton
                                    onClick={() =>
                                      updateQuantity(item?.menuId, false)
                                    }
                                  >
                                    <RemoveIcon
                                      sx={{
                                        color: (theme) =>
                                          theme.palette.success.main,
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
                                    onClick={() =>
                                      updateQuantity(item?.menuId, true)
                                    }
                                  >
                                    <AddIcon
                                      sx={{
                                        color: (theme) =>
                                          theme.palette.success.main,
                                      }}
                                    />
                                  </IconButton>
                                </Box>
                              </TableCell>
                              <TableCell align="right">
                                ${item?.price?.toFixed(2)}
                              </TableCell>
                              <TableCell align="right">
                                ${(item?.price * item?.quantity).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Box sx={{ mt: 2, p: 2 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mt: 1 }}
                      >
                        <Typography variant="subtitle2" fontWeight={'bold'}>
                          Total Price:
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={'bold'}>
                          ${totalPrice?.toFixed(2)}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Card>
                <RHFButton
                  isLoading={isLoading}
                  type="submit"
                  onClick={handleSubmit}
                  title={'Proceed To Payment'}
                  variant={'contained'}
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
