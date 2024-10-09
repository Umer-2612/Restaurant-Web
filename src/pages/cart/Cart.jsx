import React, { useEffect, useState } from 'react';

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
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to other pages

  useEffect(() => {
    const storedCartItems =
      JSON.parse(localStorage.getItem('menuDetails')) || [];
    setCartItems(storedCartItems);
  }, []);

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

    setCartItems(updatedItems);
    localStorage.setItem('menuDetails', JSON.stringify(updatedItems));
  };

  const removeItem = (menuId) => {
    const updatedItems = cartItems.filter((item) => item.menuId !== menuId);
    setCartItems(updatedItems);
    localStorage.setItem('menuDetails', JSON.stringify(updatedItems));
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.itemPrice * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert('::hi');
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
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" // Replace with your custom image URL
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
                        image="https://punjabitouchindianrestaurant.com.au/wp-content/uploads/2023/10/one-pan-paneer-and-spinach-tikka-masala-150801-1-1568x1045.webp" // Replace with actual image URL
                        alt={item.itemName}
                      />
                      <Box sx={{ flex: 1, ml: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: '500' }}>
                          {item.itemName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Category: Vegetable
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'red' }}>
                          ${item.itemPrice}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                          onClick={() => updateQuantity(item?.menuId, false)}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <Typography variant="h6" sx={{ mx: 1 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => updateQuantity(item?.menuId, true)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="h6" sx={{ ml: 2 }}>
                        ${(item.itemPrice * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton
                        color="error"
                        sx={{ ml: 2 }}
                        onClick={() => removeItem(item.menuId)}
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
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                    onClick={handleCheckout}
                  >
                    Proceed to Payment
                  </Button>
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
