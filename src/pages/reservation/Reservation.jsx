import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import RHFButton from 'components/button/RHFButton';
import { Banner } from 'components/common/Banner';
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

  const [reservation, { isLoading }] = usePutPostReservationMutation();

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await reservation(data);
      console.log(response?.error?.data?.message);
      if (response?.data) {
        showToast(response?.data?.message, 'success');
      } else {
        showToast(response?.error?.data?.message, 'error');
      }
    } catch (error) {
      console.log('error');
    }
  };
  const handleChangeDate = (newValue) => {
    setValue('reservationDate', newValue);
  };
  return (
    <>
      <Banner />
      {/* New Reservation Section */}
      <Container>
        <Stack gap={4}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{ color: 'red', fontWeight: 'bold' }}
              textAlign={'left'}
            >
              RESERVATION
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
              Do you want to taste our soulful food? Try our authentic flavours
              of cuisines, which are loaded with the tradition, culture and
              Warmth of Indian history. Reserve your table now!
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
              Booking your table in advance will help you get rid of last-minute
              hassle. You don’t need to wait for long hours to taste our
              tempting food when you have booked your table. Your order will
              arrive at your table in no time! Discover the world of Culinary
              delight with our specially designed menu.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
              Our team features a selection of unique & delicious options for
              snacks, lunch & dinner. We want to keep you closer to the
              delicious meals that make you drool and melt your heart. We invite
              you with all our love to taste the difference. Reserve your table
              now with just one single tap!
            </Typography>
            <Typography variant="body1" sx={{ mt: 4 }} textAlign={'left'}>
              <Typography>📞 0721421728</Typography>
              <Typography mt={1}>
                📧 info@punjabitouchindianrestaurant.com.au
              </Typography>
              <Typography mt={1}>📍 T2/356 Middle Road, Greenbank</Typography>
            </Typography>
          </Box>
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            container
            spacing={3}
          >
            {/* First Name Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <HookTextField
                control={control}
                label="First Name*"
                name="firstName"
                fullWidth
                // autoFocuss
              />
            </Grid>

            {/* Last Name Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <HookTextField
                control={control}
                label="Last Name*"
                name="lastName"
                fullWidth
              />
            </Grid>

            {/* Phone Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <HookTextField
                control={control}
                label="Phone no*"
                name="phoneNo"
                fullWidth
              />
            </Grid>

            {/* Email Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <HookTextField
                control={control}
                label="Email*"
                name="email"
                fullWidth
              />
            </Grid>

            {/* Number of People Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <HookTextField
                control={control}
                type="number"
                label="No of People*"
                name="noOfPeople"
                fullWidth
              />
            </Grid>

            {/* Date Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <HookDateField
                name="reservationDate"
                date={dayjs()} // Set the current date
                control={control}
                dateHandler={(date) => {
                  handleChangeDate(date);
                }}
                maxDate={dayjs().add(100, 'years')} // Maximum date is 100 years from now
                minDate={dayjs()} // Ensure that past dates are disabled
                label="Date*"
                onBlur={() => trigger('date')}
              />
            </Grid>

            {/* Message Field */}
            <Grid item size={12}>
              <HookTextField
                control={control}
                label="Message*"
                name="message"
                fullWidth
              />{' '}
            </Grid>

            {/* Submit Button */}
            <Grid item size={12} display="flex" justifyContent="end">
              <RHFButton
                isLoading={isLoading}
                type="submit"
                variant="contained"
                color={'primary'}
                title={'submit'}
              />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default Reservation;
