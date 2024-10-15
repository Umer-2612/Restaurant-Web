import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import contact from 'assets/images/bgimage.jpeg';
import RHFButton from 'components/button/RHFButton';
import { Banner, BannerText } from 'components/common/Banner';
import useToast from 'components/common/CustomToastMessage';
import HookTextField from 'components/common/form-components/HookTextField';
import { usePutPostContactUsMutation } from 'store/apis/contactUs';
import { fnPressNumberKeyWithHyphen } from 'utils/commonFunctions';
import { validationSchema } from 'utils/validation';
const RESERVATION_FORM_VALIDATION = Yup.object().shape({
  firstName: validationSchema.firstName,
  lastName: validationSchema.lastName,
  phoneNo: validationSchema.phoneNo,
  email: validationSchema.email,
  message: validationSchema.message,
});

const ContactUs = () => {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(RESERVATION_FORM_VALIDATION),
  });

  const [contactUs, { isLoading }] = usePutPostContactUsMutation();

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await contactUs(data);
      if (response?.data) {
        showToast(response?.data?.message, 'success');
        reset();
      } else {
        showToast(response?.data?.message, 'error');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <>
      <Banner image={contact}>
        <BannerText>Contact Us</BannerText>
      </Banner>
      <Container>
        <Stack gap={8} mt={8}>
          <Stack gap={3} sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{ color: 'red', fontWeight: 'bold' }}
              textAlign={'left'}
            >
              CONTACT US
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} textAlign={'left'}>
              Do you want to renew yourself with a lavish meal after a long day
              that will set your mood? We promise our lavish meal can set your
              mood and force you to lick your fingers. Enjoy our delicious food
              & for any more queries, reach out to us. Feel free to contact us!
            </Typography>

            <Typography variant="body1" sx={{ mt: 4 }} textAlign={'left'}>
              <Typography>📞 0721421728</Typography>
              <Typography mt={2}>
                📧 info@punjabitouchindianrestaurant.com.au
              </Typography>
              <Typography mt={2}>📍 T2/356 Middle Road, Greenbank</Typography>
            </Typography>
          </Stack>
          <Grid
            container
            spacing={4}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* First Name Field */}
            <Grid item size={{ xs: 12, sm: 6 }}>
              <HookTextField
                control={control}
                label="First Name*"
                name="firstName"
                fullWidth
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
                label="Phone No*"
                name="phoneNo"
                fullWidth
                onKeyPress={fnPressNumberKeyWithHyphen}
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

            {/* Message Field */}
            <Grid item size={12}>
              <HookTextField
                control={control}
                label="Message*"
                name="message"
                fullWidth
              />
            </Grid>

            {/* Submit Button */}
            <Grid item size={12} justifyContent="end" display="flex">
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

export default ContactUs;
