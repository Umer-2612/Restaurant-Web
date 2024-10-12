import React, { useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

import emptyCartImage from 'assets/images/empty_cart.svg';
import RHFButton from 'components/button/RHFButton';
import { useCreateCheckoutSessionMutation } from 'store/apis/checkoutApi';
import { cartSelector, modifyCartDetails } from 'store/slices/cart';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  // const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to other pages
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector) || [];
  console.log('cartItems', cartItems);

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
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      })
      .filter((item) => item !== null);

    localStorage.setItem('menuDetails', JSON.stringify(updatedItems));
    dispatch(modifyCartDetails(updatedItems)); // Update Redux cart state
  };

  const removeItem = (menuId) => {
    const updatedItems = cartItems.filter((item) => item.menuId !== menuId);
    localStorage.setItem('menuDetails', JSON.stringify(updatedItems));
    dispatch(modifyCartDetails(updatedItems)); // Update Redux cart state
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item?.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    console.log('::stripePromise', stripe);
    const payload = {
      items: cartItems.map((item) => ({
        menuId: item.menuId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imagePath: item.imagePath,
      })),
      totalPrice: totalPrice,
    };
    console.log('::payload', payload);

    const { data: session } = await createCheckoutSession(payload);
    console.log(session);
    const result = await stripe.redirectToCheckout({
      sessionId: session?.sessionId,
    });
    console.log(result);
  };

  return (
    <Container>
      <Box>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: (theme) => theme.palette.primary.main,
            fontFamily: 'Poppins Sans-serif',
            fontWeight: 'bold',
          }}
        >
          Shopping Cart
        </Typography>

        {/* Display this if cart is empty */}
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <img
              src={emptyCartImage}
              alt="No items"
              style={{ width: '300px', marginBottom: '20px' }}
            />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your cart is empty!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/menu')} // Navigate to the menu page
            >
              Go to Menu
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Cart Items Section */}
            <Grid item xs={12} md={8}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow:
                    'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    color: (theme) => theme.palette.primary.main,
                    fontFamily: 'Poppins Sans-serif',
                    fontWeight: '600',
                  }}
                >
                  Your Cart Items
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box
                  sx={{
                    'maxHeight': 400,
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
                        transition:
                          'transform 0.3s ease-in-out, box-shadow 0.3s',
                        borderBottom: '1px solid',
                        borderColor: 'other.border',
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
                        <Typography variant="h6" sx={{ fontWeight: '500' }}>
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

            {/* Summary Section */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow:
                    'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
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
                  {/* <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                    onClick={handleCheckout}
                  >
                    Proceed to Payment
                  </Button> */}
                  <RHFButton
                    isLoading={isLoading}
                    variant="contained"
                    color={'primary'}
                    onClick={handleCheckout}
                    title={'Proceed to Payment'}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
