import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Banner } from 'components/common/Banner';
import useToast from 'components/common/CustomToastMessage';
import { usePutPostReservationMutation } from 'store/apis/reservation';
import { LIGHT } from 'store/theme/colors';
import { validationSchema } from 'utils/validation';

const RESERVATION_FORM_VALIDATION = Yup.object().shape({
  firstName: validationSchema.firstName,
  lastName: validationSchema.lastName,
  phoneNo: validationSchema.phoneNo,
  email: validationSchema.email,
  reservationDate: validationSchema.reservationDate,
  message: validationSchema.message,
  noOfPeople: validationSchema.noOfPeople,
});
const theme = createTheme({
  palette: LIGHT,
});
const Reservation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(RESERVATION_FORM_VALIDATION),
  });

  const [reservation] = usePutPostReservationMutation();

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await reservation(data);
      if (response?.data) {
        showToast(response?.data?.message, 'success');
      } else {
        showToast(response?.data?.message, 'error');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Banner />

      {/* New Reservation Section */}
      <Container>
        <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
          <Typography
            variant="h4"
            sx={{ color: 'red', fontWeight: 'bold' }}
            textAlign={'left'}
          >
            RESERVATION
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
            Do you want to taste our soulful food? Try our authentic flavours of
            cuisines, which are loaded with the tradition, culture and Warmth of
            Indian history. Reserve your table now!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
            Booking your table in advance will help you get rid of last-minute
            hassle. You don’t need to wait for long hours to taste our tempting
            food when you have booked your table. Your order will arrive at your
            table in no time! Discover the world of Culinary delight with our
            specially designed menu.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
            Our team features a selection of unique & delicious options for
            snacks, lunch & dinner. We want to keep you closer to the delicious
            meals that make you drool and melt your heart. We invite you with
            all our love to taste the difference. Reserve your table now with
            just one single tap!
          </Typography>
          <Typography variant="body1" sx={{ mt: 4 }} textAlign={'left'}>
            <Typography>📞 0721421728</Typography>
            <Typography mt={1}>
              📧 info@punjabitouchindianrestaurant.com.au
            </Typography>
            <Typography mt={1}>📍 T2/356 Middle Road, Greenbank</Typography>
          </Typography>
        </Box>
      </Container>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '60%',
          margin: '0 auto',
          padding: '20px',
          // backgroundColor: (theme) => theme.palette.grey[100],
          borderRadius: '8px',
        }}
      >
        <Grid container spacing={2}>
          {/* First Name Field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                  InputProps={{
                    style: {
                      backgroundColor: (theme) => theme.palette.grey[200],
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Last Name Field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                  InputProps={{
                    style: {
                      backgroundColor: (theme) => theme.palette.grey[200],
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Phone Field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="phoneNo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone No"
                  fullWidth
                  variant="outlined"
                  error={!!errors.phoneNo}
                  helperText={errors.phoneNo ? errors.phoneNo.message : ''}
                  InputProps={{
                    maxLength: 10,
                    style: {
                      backgroundColor: (theme) => theme.palette.grey[200],
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  InputProps={{
                    style: {
                      backgroundColor: (theme) => theme.palette.grey[200],
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Number of People Field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="noOfPeople"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number of People"
                  fullWidth
                  type="number"
                  variant="outlined"
                  error={!!errors.noOfPeople}
                  helperText={
                    errors.noOfPeople ? errors.noOfPeople.message : ''
                  }
                  InputProps={{
                    style: {
                      backgroundColor: (theme) => theme.palette.grey[200],
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Date Field */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="reservationDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.reservationDate}
                  helperText={
                    errors.reservationDate ? errors.reservationDate.message : ''
                  }
                  InputProps={{
                    style: {
                      cursor: 'pointer',
                      backgroundColor: (theme) => theme.palette.grey[200],
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Message Field */}
          <Grid item xs={12}>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  error={!!errors.message}
                  helperText={errors.message ? errors.message.message : ''}
                  InputProps={{
                    style: {
                      backgroundColor: (theme) => theme.palette.grey[200],
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={{
                'display': 'block',
                'marginLeft': 'auto',
                'backgroundColor': (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Reservation;
