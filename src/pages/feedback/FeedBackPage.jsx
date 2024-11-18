import React, { useEffect } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { modifyCartDetails } from 'store/slices/cart';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'success') {
      localStorage.clear('menuDetails');
      dispatch(modifyCartDetails([]));
    }
  });
  // const orderId = searchParams.get('orderId');
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={8}
      bgcolor="#f5f5f5"
    >
      <Card
        sx={{
          width: 800,
          height: 500,
          textAlign: 'center',
          padding: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent>
          {status === 'success' ? (
            <Stack gap={4} justifyContent="center" alignItems="center">
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 80,
                  color: (theme) => theme.palette.success.main,
                }}
              />
              <Typography variant="h3" component="div">
                Thank you for ordering!
              </Typography>
              <Typography variant="body2" component="div">
                You will get a call when your order is ready!
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/menu')}
              >
                Continue browsing
              </Button>
            </Stack>
          ) : (
            <Stack gap={4} justifyContent="center" alignItems="center">
              <ErrorOutlineIcon sx={{ fontSize: 80, color: 'red' }} />
              <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                Something went wrong!
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Please try again later or contact support.
              </Typography>
              <Stack direction="row" gap={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ borderRadius: 2 }}
                  onClick={() => navigate('/contact-us')}
                >
                  Contact Support
                </Button>
                <Button
                  variant="contained"
                  sx={{ mr: 2, borderRadius: 2 }}
                  onClick={() => navigate('/cart')}
                >
                  Retry
                </Button>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
FeedbackPage.propTypes = {
  status: PropTypes.any,
};

export default FeedbackPage;
