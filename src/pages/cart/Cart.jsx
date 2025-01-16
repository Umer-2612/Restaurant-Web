import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
import {
  useCreateCheckoutSessionMutation,
  useCreateCodOrderMutation,
} from 'store/apis/checkoutApi';
import { cartSelector, modifyCartDetails } from 'store/slices/cart';
import useRestaurantStatus from 'store/slices/useRestaurantStatus';
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
  const { isOpen, checkIfOpen } = useRestaurantStatus();
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();
  const [createCodOrder, { isLoading: isCODLoading }] =
    useCreateCodOrderMutation();

  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector) || [];
  const [searchParams] = useSearchParams();
  const [showClosedMessage, setShowClosedMessage] = useState(false);

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
    // Check restaurant status before proceeding
    const currentStatus = checkIfOpen();
    if (!currentStatus) {
      setShowClosedMessage(true);
      return;
    }

    console.log({ formData });
    if (formData?.isPOD) {
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
        isPOD: formData?.isPOD,
      };
      const { data } = await createCodOrder(payload);
      if (data) {
        navigate(`/orderStatus?status=success&orderId=${data?.data?._id}`);
      }
    } else {
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
    }
  };

  // Initialize form handling with validation

  const { control, handleSubmit, setValue } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(CUSTOM_FORM_VALIDATION),
  });

  return (
    <Stack alignItems="center" justifyContent="center" my={15}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack gap={3}>
          <Typography variant="h4" fontWeight={600}>
            Cart
          </Typography>
          {(!isOpen || showClosedMessage) && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: 'warning.light',
                py: 2,
                px: 3,
                borderRadius: 2,
              }}
            >
              <Typography color="warning.dark" align="center" fontWeight={500}>
                Restaurant is currently closed. Please check back durin business
                hours.
              </Typography>
            </Stack>
          )}
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
                <Stack
                  bgcolor={(theme) => theme.palette.other.bgColor}
                  p={4}
                  borderRadius={3}
                  gap={4}
                >
                  <Stack px={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Enter Your Details
                    </Typography>
                  </Stack>
                  <CustomForm
                    handleCheckout={handleCheckout}
                    control={control}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </Stack>
              </Grid>
              <Grid item size={{ xs: 12, md: 7 }}>
                <Stack gap={3}>
                  <Stack
                    bgcolor={(theme) => theme.palette.other.bgColor}
                    p={4}
                    borderRadius={3}
                    gap={4}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Order Summary
                    </Typography>

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
                              <TableCell
                                sx={{
                                  borderTopLeftRadius: 12,
                                  borderBottomLeftRadius: 12,
                                  height: 56,
                                }}
                              >
                                Name
                              </TableCell>
                              <TableCell align="center">Quantity</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell
                                sx={{
                                  borderTopRightRadius: 12,
                                  borderBottomRightRadius: 12,
                                  height: 56,
                                }}
                                align="right"
                              >
                                Total
                              </TableCell>
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
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <RHFButton
                      fullWidth
                      isLoading={isCODLoading}
                      type="submit"
                      onClick={() => {
                        setValue('isPOD', true);
                      }}
                      title={'Pay on Delivery'}
                      variant={'outlined'}
                      disabled={!checkIfOpen()}
                    />
                    <RHFButton
                      fullWidth
                      isLoading={isLoading}
                      type="submit"
                      onClick={() => {
                        setValue('isPOD', false);
                      }}
                      title={'Proceed To Payment'}
                      variant={'contained'}
                      disabled={!checkIfOpen()}
                    />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

export default Cart;
