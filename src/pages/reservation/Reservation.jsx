import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import useToast from 'components/common/CustomToastMessage';
import HookDateField from 'components/common/form-components/HookDateField';
import HookTextField from 'components/common/form-components/HookTextField';
import { usePutPostReservationMutation } from 'store/apis/reservation';
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
const Reservation = () => {
  const { control, handleSubmit, setValue, trigger } = useForm({
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
  const handleChangeDate = (newValue) => {
    setValue('date', newValue);
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
          <HookTextField
            control={control}
            label="First Name*"
            name="firstName"
            fullWidth
            // autoFocuss
          />
        </Grid>

        {/* Last Name Field */}
        <Grid item xs={12} sm={6}>
          <HookTextField
            control={control}
            label="Last Name*"
            name="lastName"
            fullWidth
          />
        </Grid>

        {/* Phone Field */}
        <Grid item xs={12} sm={6}>
          <HookTextField
            control={control}
            label="Phone no*"
            name="phoneNo"
            fullWidth
          />
        </Grid>

        {/* Email Field */}
        <Grid item xs={12} sm={6}>
          <HookTextField
            control={control}
            label="Email*"
            name="email"
            fullWidth
          />
        </Grid>

        {/* Number of People Field */}
        <Grid item xs={12} sm={6}>
          <HookTextField
            control={control}
            label="No of People*"
            name="noOfPeople"
            fullWidth
          />
        </Grid>

        {/* Date Field */}
        <Grid item xs={12} sm={6}>
          <HookDateField
            name="reservationDate"
            date={dayjs()}
            control={control}
            dateHandler={(date) => {
              handleChangeDate(date);
            }}
            maxDate={dayjs().add(100, 'years')}
            minDate={dayjs().subtract(20, 'years')}
            label="Date*"
            onBlur={() => trigger('date')}
          />
        </Grid>

        {/* Message Field */}
        <Grid item xs={12}>
          <HookTextField
            control={control}
            label="Message*"
            name="message"
            fullWidth
          />{' '}
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
