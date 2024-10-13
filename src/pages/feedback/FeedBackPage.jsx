import React from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const FeedbackPage = ({ status }) => {
  const navigate = useNavigate();
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
            <Box>
              <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#ff6d00' }} />
              <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                Thank you for ordering!
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/menu')}
              >
                Continue browsing
              </Button>
            </Box>
          ) : (
            <Box>
              <ErrorOutlineIcon sx={{ fontSize: 80, color: 'red' }} />
              <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                Something went wrong!
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Please try again later or contact support.
              </Typography>
              <Button
                variant="outlined"
                sx={{ mr: 2, borderRadius: 2 }}
                onClick={() => navigate('/cart')}
              >
                Retry
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
                onClick={() => navigate('/contact-us')}
              >
                Contact Support
              </Button>
            </Box>
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
