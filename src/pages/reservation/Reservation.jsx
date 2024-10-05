import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import useToast from 'components/common/CustomToastMessage';
import { usePutPostReservationMutation } from 'store/apis/reservation';
import { validationSchema } from 'utils/validation';

const RESERVATION_FORM_VALIDATION = Yup.object().shape({
  firstName: validationSchema.firstName,
  lastName: validationSchema.lastName,
  phoneNo: validationSchema.phoneNo,
  email: validationSchema.email,
  date_of_reservation: validationSchema.date_of_reservation,
  message: validationSchema.message,
  noOfPeople: validationSchema.noOfPeople,
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '60%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: (theme) => theme.palette.grey[100],
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
                helperText={errors.noOfPeople ? errors.noOfPeople.message : ''}
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
            name="date_of_reservation"
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
                error={!!errors.date_of_reservation}
                helperText={
                  errors.date_of_reservation
                    ? errors.date_of_reservation.message
                    : ''
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
  );
};

export default Reservation;
