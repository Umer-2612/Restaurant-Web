import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import backGroundImage from 'assets/images/reservation.jpg';
import Reveal from 'components/animation/Reveal';
import RHFButton from 'components/button/RHFButton';
import { Banner, BannerText } from 'components/common/Banner';
import useToast from 'components/common/CustomToastMessage';
import HookDateField from 'components/common/form-components/HookDateField';
import HookTextField from 'components/common/form-components/HookTextField';
import { usePutPostReservationMutation } from 'store/apis/reservation';
import { fnPressNumberKeyWithHyphen } from 'utils/commonFunctions';
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
  const { control, handleSubmit, setValue, trigger, reset } = useForm({
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
        reset();
      } else {
        showToast(
          response?.error?.data?.message ||
            'Failed to submit, Please try again',
          'error'
        );
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
      <Banner image={backGroundImage}>
        <BannerText>
          {' '}
          <Reveal>Reserve your Table </Reveal>
        </BannerText>
      </Banner>
      {/* New Reservation Section */}
      <Container>
        <Stack gap={8}>
          <Stack
            gap={3}
            sx={{
              textAlign: 'center',
              p: 6,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primaryColor[50]}, ${theme.palette.sectionBackground.main})`,
              borderRadius: 6,
              color: 'text.primary',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                textAlign: 'left',
              }}
            >
              <Reveal>
                Do you want to taste our soulful food? Try our authentic
                flavours of cuisines, loaded with tradition, culture, and the
                warmth of Indian history. Reserve your table now!
              </Reveal>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                textAlign: 'left',
              }}
            >
              <Reveal>
                Booking your table in advance helps you avoid last-minute
                hassle. No long waits when you&apos;ve booked ahead. Experience
                culinary delight with our specially designed menu.
              </Reveal>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                textAlign: 'left',
              }}
            >
              <Reveal>
                Our team curates unique and delicious options for snacks, lunch,
                and dinner. Let our meals bring you closer to home-cooked
                deliciousness. Reserve your table now with one simple tap!
              </Reveal>
            </Typography>

            <Stack
              direction="column"
              spacing={2}
              sx={{
                mt: 4,
                textAlign: 'left',
              }}
            >
              <Typography>
                {' '}
                <Reveal>📞 0721421728</Reveal>
              </Typography>
              <Typography>
                <Reveal>
                  <Link
                    href="mailto:info@punjabitouchindianrestaurant.com.au"
                    style={{
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textDecoration: 'none',
                      maxWidth: '100%',
                      marginTop: '8px',
                      color: 'inherit',
                    }}
                  >
                    📧 info@punjabitouchindianrestaurant.com.au
                  </Link>
                </Reveal>
              </Typography>
              <Typography>
                <Reveal>
                  <Link
                    href="https://www.google.com/maps/place/Punjabi+Touch+Indian+Restaurant/@-27.6967901,152.9952674,15z/data=!3m1!4b1!4m6!3m5!1s0x6b9149df52976db3:0x51433e0d31db4569!8m2!3d-27.6967913!4d153.0137!16s%2Fg%2F11l6g9tz2m?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    📍 T2/356 Middle Road, Greenbank
                  </Link>
                </Reveal>
              </Typography>
            </Stack>
          </Stack>
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            container
            spacing={5}
          >
            {/* First Name Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Reveal>
                <HookTextField
                  control={control}
                  label="First Name*"
                  name="firstName"
                  fullWidth
                  // autoFocuss
                />
              </Reveal>
            </Grid>

            {/* Last Name Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Reveal>
                {' '}
                <HookTextField
                  control={control}
                  label="Last Name*"
                  name="lastName"
                  fullWidth
                />
              </Reveal>
            </Grid>

            {/* Phone Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Reveal>
                <HookTextField
                  control={control}
                  label="Phone No*"
                  name="phoneNo"
                  fullWidth
                  onKeyPress={fnPressNumberKeyWithHyphen}
                />
              </Reveal>
            </Grid>

            {/* Email Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Reveal>
                <HookTextField
                  control={control}
                  label="Email*"
                  name="email"
                  fullWidth
                />
              </Reveal>
            </Grid>

            {/* Number of People Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Reveal>
                <HookTextField
                  control={control}
                  label="No of People*"
                  name="noOfPeople"
                  inputProps={{
                    min: 1,
                  }}
                  fullWidth
                  onKeyPress={fnPressNumberKeyWithHyphen}
                />
              </Reveal>
            </Grid>

            {/* Date Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <Reveal>
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
              </Reveal>
            </Grid>

            {/* Message Field */}
            <Grid item size={12}>
              <Reveal>
                <HookTextField
                  control={control}
                  label="Message*"
                  name="message"
                  fullWidth
                  multiline={true}
                  showCount
                  rows={5}
                  inputProps={{
                    maxLength: 500,
                  }}
                />{' '}
              </Reveal>
            </Grid>

            {/* Submit Button */}
            <Grid item size={12} display="flex" justifyContent="end">
              <Reveal>
                <RHFButton
                  isLoading={isLoading}
                  type="submit"
                  variant="contained"
                  title={'Submit'}
                />
              </Reveal>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default Reservation;
